import { hashPassword, comparePassword } from "@/lib/auth";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export interface RecyclerProfile {
  shopName: string;
  ownerName: string;
  aadhaarNumber: string;
  aadhaarVerified: boolean;
  shopAddress: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  latitude: string;
  longitude: string;
  businessType: "Recycler" | "Scrap Dealer" | "Collection Centre" | string;
  acceptedEWaste: string[];
  documents: {
    shopPhoto?: string;
    shopLicense?: string;
    ownerIdProof?: string;
  };
}

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  citizenId?: string;
  recyclerLicenseNo?: string;
  role: "CITIZEN" | "RECYCLER" | "OFFICER" | "ADMIN";
  recyclerProfile?: RecyclerProfile;
}

// In-memory store persistent during node process lifecycle
const globalUsers = globalThis as unknown as {
  usersStore?: Map<string, StoredUser>;
};

if (!globalUsers.usersStore) {
  globalUsers.usersStore = new Map<string, StoredUser>();

  // Default demo citizen user
  globalUsers.usersStore.set("rajesh.kumar@example.in", {
    id: "usr_rajesh_kumar",
    email: "rajesh.kumar@example.in",
    passwordHash: "$2a$10$e7c.h5a0U1g80g0V.b0c.e0z00000000000000000000000000000",
    fullName: "Rajesh Kumar",
    mobile: "9876543210",
    address: "Flat 402, Green Park Apartments, Sector 14",
    city: "New Delhi",
    state: "DL",
    pin: "110016",
    citizenId: "DL-2026-8941",
    role: "CITIZEN",
  });

  // Default demo recycler user
  globalUsers.usersStore.set("recycler@ecoroute.gov.in", {
    id: "usr_ecorecycle_buyer",
    email: "recycler@ecoroute.gov.in",
    passwordHash: "$2a$10$e7c.h5a0U1g80g0V.b0c.e0z00000000000000000000000000000",
    fullName: "Suresh Sharma",
    mobile: "9876543211",
    address: "Industrial Area Phase 2",
    city: "New Delhi",
    state: "DL",
    pin: "110020",
    recyclerLicenseNo: "CPCB-REC-2026-9041",
    role: "RECYCLER",
    recyclerProfile: {
      shopName: "EcoRecycle India Pvt Ltd",
      ownerName: "Suresh Sharma",
      aadhaarNumber: "123456789012",
      aadhaarVerified: true,
      shopAddress: "Plot 42, Industrial Area Phase 2",
      city: "New Delhi",
      district: "South Delhi",
      state: "Delhi",
      pincode: "110020",
      latitude: "28.5355",
      longitude: "77.2610",
      businessType: "Recycler",
      acceptedEWaste: ["Mobiles", "Laptops", "Computers", "TV", "Batteries"],
      documents: {
        shopPhoto: "uploaded_shop.jpg",
        shopLicense: "cpcb_license.pdf",
        ownerIdProof: "aadhaar_proof.pdf",
      },
    },
  });
}

export const usersStore = globalUsers.usersStore;

export async function findUserByEmail(email: string): Promise<StoredUser | undefined> {
  const lowerEmail = email.toLowerCase().trim();

  if (isSupabaseConfigured()) {
    try {
      const { data: suUser } = await supabaseAdmin
        .from("users")
        .select("*, profiles(*), recycler_profiles(*)")
        .eq("email", lowerEmail)
        .maybeSingle();

      if (suUser) {
        const prof = suUser.profiles?.[0] || suUser.profiles;
        const recProf = suUser.recycler_profiles?.[0] || suUser.recycler_profiles;

        return {
          id: suUser.id,
          email: suUser.email,
          passwordHash: suUser.password_hash,
          fullName: recProf?.owner_name || prof?.full_name || "EcoRoute User",
          mobile: prof?.mobile || recProf?.mobile || "",
          address: prof?.address || recProf?.shop_address || "",
          city: prof?.city || recProf?.city || "",
          state: prof?.state || recProf?.state || "",
          pin: prof?.pin_code || recProf?.pincode || "",
          citizenId: suUser.citizen_id,
          recyclerLicenseNo: suUser.recycler_license_no,
          role: suUser.role || "CITIZEN",
          recyclerProfile: recProf
            ? {
                shopName: recProf.shop_name,
                ownerName: recProf.owner_name,
                aadhaarNumber: recProf.aadhaar_number,
                aadhaarVerified: recProf.aadhaar_verified,
                shopAddress: recProf.shop_address,
                city: recProf.city,
                district: recProf.district,
                state: recProf.state,
                pincode: recProf.pincode,
                latitude: recProf.latitude,
                longitude: recProf.longitude,
                businessType: recProf.business_type,
                acceptedEWaste: recProf.accepted_ewaste || [],
                documents: {
                  shopPhoto: recProf.shop_photo,
                  shopLicense: recProf.shop_license,
                  ownerIdProof: recProf.owner_id_proof,
                },
              }
            : undefined,
        };
      }
    } catch (e) {
      console.warn("Supabase query error, falling back to local store:", e);
    }
  }

  return usersStore.get(lowerEmail);
}

export async function findUserByEmailOrMobile(identifier: string): Promise<StoredUser | undefined> {
  const cleanId = identifier.toLowerCase().trim();

  // Try email lookup first
  const byEmail = await findUserByEmail(cleanId);
  if (byEmail) return byEmail;

  // Search local store by mobile
  for (const user of usersStore.values()) {
    if (user.email.toLowerCase() === cleanId || user.mobile === cleanId) {
      return user;
    }
  }
  return undefined;
}

export async function createUser(userData: {
  fullName: string;
  email: string;
  mobile: string;
  passwordHash: string;
  address: string;
  city: string;
  state: string;
  pin: string;
}): Promise<StoredUser> {
  const lowerEmail = userData.email.toLowerCase().trim();
  const citizenId = `DL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const mockUserId = `usr_${Date.now()}`;

  const newUser: StoredUser = {
    id: mockUserId,
    email: lowerEmail,
    passwordHash: userData.passwordHash,
    fullName: userData.fullName,
    mobile: userData.mobile,
    address: userData.address,
    city: userData.city,
    state: userData.state,
    pin: userData.pin,
    citizenId: citizenId,
    role: "CITIZEN",
  };

  usersStore.set(lowerEmail, newUser);

  if (isSupabaseConfigured()) {
    try {
      const { data: suUser, error: uErr } = await supabaseAdmin
        .from("users")
        .insert({
          email: lowerEmail,
          password_hash: userData.passwordHash,
          role: "CITIZEN",
          citizen_id: citizenId,
        })
        .select()
        .single();

      if (suUser && !uErr) {
        await supabaseAdmin.from("profiles").insert({
          user_id: suUser.id,
          full_name: userData.fullName,
          mobile: userData.mobile,
          address: userData.address,
          city: userData.city,
          state: userData.state,
          pin_code: userData.pin,
          aadhaar_linked: true,
        });
        newUser.id = suUser.id;
      }
    } catch (e) {
      console.warn("Supabase insert error:", e);
    }
  }

  return newUser;
}

export async function createRecycler(userData: {
  shopName: string;
  ownerName: string;
  email: string;
  mobile: string;
  passwordHash: string;
  aadhaarNumber: string;
  aadhaarVerified: boolean;
  shopAddress: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  latitude: string;
  longitude: string;
  businessType: string;
  acceptedEWaste: string[];
  documents: {
    shopPhoto?: string;
    shopLicense?: string;
    ownerIdProof?: string;
  };
}): Promise<StoredUser> {
  const lowerEmail = userData.email.toLowerCase().trim();
  const licenseNo = `CPCB-REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const mockUserId = `usr_rec_${Date.now()}`;

  const newRecycler: StoredUser = {
    id: mockUserId,
    email: lowerEmail,
    passwordHash: userData.passwordHash,
    fullName: userData.ownerName,
    mobile: userData.mobile,
    address: userData.shopAddress,
    city: userData.city,
    state: userData.state,
    pin: userData.pincode,
    recyclerLicenseNo: licenseNo,
    role: "RECYCLER",
    recyclerProfile: {
      shopName: userData.shopName,
      ownerName: userData.ownerName,
      aadhaarNumber: userData.aadhaarNumber,
      aadhaarVerified: userData.aadhaarVerified,
      shopAddress: userData.shopAddress,
      city: userData.city,
      district: userData.district,
      state: userData.state,
      pincode: userData.pincode,
      latitude: userData.latitude,
      longitude: userData.longitude,
      businessType: userData.businessType,
      acceptedEWaste: userData.acceptedEWaste,
      documents: userData.documents,
    },
  };

  usersStore.set(lowerEmail, newRecycler);

  if (isSupabaseConfigured()) {
    try {
      const { data: suUser, error: uErr } = await supabaseAdmin
        .from("users")
        .insert({
          email: lowerEmail,
          password_hash: userData.passwordHash,
          role: "RECYCLER",
          recycler_license_no: licenseNo,
        })
        .select()
        .single();

      if (suUser && !uErr) {
        await supabaseAdmin.from("recycler_profiles").insert({
          user_id: suUser.id,
          shop_name: userData.shopName,
          owner_name: userData.ownerName,
          aadhaar_number: userData.aadhaarNumber,
          aadhaar_verified: userData.aadhaarVerified,
          shop_address: userData.shopAddress,
          city: userData.city,
          district: userData.district,
          state: userData.state,
          pincode: userData.pincode,
          latitude: userData.latitude,
          longitude: userData.longitude,
          business_type: userData.businessType,
          accepted_ewaste: userData.acceptedEWaste,
          shop_photo: userData.documents.shopPhoto,
          shop_license: userData.documents.shopLicense,
          owner_id_proof: userData.documents.ownerIdProof,
        });
        newRecycler.id = suUser.id;
      }
    } catch (e) {
      console.warn("Supabase recycler insert error:", e);
    }
  }

  return newRecycler;
}
