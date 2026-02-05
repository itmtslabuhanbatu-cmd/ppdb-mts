"use client";

import { useActionState, useState } from "react";
import { saveRegistrationData } from "@/app/actions/ppdb-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea"; // Unused
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save, User, MapPin, School, Users, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SubmitButton() {
    return (
        <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
            <Save className="mr-2 h-4 w-4" />
            Simpan Data
        </Button>
    );
}

import ImageUpload from "@/components/ImageUpload";

export default function PPDBForm({ initialData, userId }: { initialData: any, userId: string }) {
    const [state, formAction] = useActionState(saveRegistrationData, null);
    const [activeTab, setActiveTab] = useState("pribadi");
    const [photoUrl, setPhotoUrl] = useState(initialData?.photo_url || "");

    const tabs = [
        { id: "pribadi", label: "Data Pribadi", icon: User },
        { id: "alamat", label: "Alamat", icon: MapPin },
        { id: "ortu", label: "Orang Tua", icon: Users },
        { id: "sekolah", label: "Sekolah Asal", icon: School },
    ];

    // Helper to get value safely
    const val = (key: string) => initialData?.[key] || "";

    return (
        <div>
            {/* Custom Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            type="button"
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${activeTab === tab.id
                                    ? "bg-green-100 text-green-800 border border-green-200"
                                    : "text-gray-600 hover:bg-gray-100"}`}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {state?.success && (
                <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                    <Save className="h-4 w-4" />
                    <AlertTitle>Berhasil!</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            {state?.error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertTitle>Gagal Menyimpan</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            )}

            <form action={formAction} className="space-y-6">
                {/* Hidden Fields */}
                <input type="hidden" name="user_id" value={userId} />
                <input type="hidden" name="photo_url" value={photoUrl} />
                <input type="hidden" name="nisn" value={val("nisn")} />

                {/* --- DATA PRIBADI --- */}
                <div className={activeTab === "pribadi" ? "block space-y-4" : "hidden"}>
                    <div className="space-y-2">
                        <Label>NIK</Label>
                        <Input name="nik" defaultValue={val("nik")} placeholder="16 digit angka" />
                    </div>
                    <div className="space-y-2">
                        <Label>No. KK</Label>
                        <Input name="kk" defaultValue={val("kk")} placeholder="16 digit angka" />
                    </div>
                    <div className="space-y-2">
                        <Label>Tempat Lahir</Label>
                        <Input name="birth_place" defaultValue={val("birth_place")} />
                    </div>
                    <div className="space-y-2">
                        <Label>Tanggal Lahir</Label>
                        <Input name="birth_date" type="date" defaultValue={val("birth_date")} />
                    </div>
                    <div className="space-y-2">
                        <Label>Jenis Kelamin</Label>
                        <select name="gender" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" defaultValue={val("gender")}>
                            <option value="">Pilih...</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>Agama</Label>
                        <select name="religion" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" defaultValue={val("religion")}>
                            <option value="Islam">Islam</option>
                            <option value="Kristen">Kristen</option>
                            <option value="Katolik">Katolik</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Buddha">Buddha</option>
                            <option value="Konghucu">Konghucu</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>Anak ke-</Label>
                        <Input name="child_order" type="number" defaultValue={val("child_order")} />
                    </div>
                    <div className="space-y-2">
                        <Label>Jumlah Saudara</Label>
                        <Input name="siblings_count" type="number" defaultValue={val("siblings_count")} />
                    </div>
                    <div className="space-y-2">
                        <Label>Cita-cita</Label>
                        <Input name="ambition" defaultValue={val("ambition")} />
                    </div>
                    <div className="space-y-2">
                        <Label>Hobi</Label>
                        <Input name="hobby" defaultValue={val("hobby")} />
                    </div>
                    <div className="space-y-2">
                        <Label>No. HP / WA Siswa (jika ada)</Label>
                        <Input name="phone" defaultValue={val("phone")} />
                    </div>
                </div>

                {/* --- ALAMAT --- */}
                <div className={activeTab === "alamat" ? "block space-y-4" : "hidden"}>
                    <div className="space-y-2">
                        <Label>Alamat Lengkap (Jalan/Dusun/Lingkungan)</Label>
                        <Input name="address" defaultValue={val("address")} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Desa / Kelurahan</Label>
                            <Input name="village" defaultValue={val("village")} />
                        </div>
                        <div className="space-y-2">
                            <Label>Kecamatan</Label>
                            <Input name="district" defaultValue={val("district")} />
                        </div>
                        <div className="space-y-2">
                            <Label>Kabupaten / Kota</Label>
                            <Input name="city" defaultValue={val("city")} />
                        </div>
                        <div className="space-y-2">
                            <Label>Kode Pos</Label>
                            <Input name="postal_code" defaultValue={val("postal_code")} />
                        </div>
                        <div className="space-y-2">
                            <Label>Jarak ke Sekolah</Label>
                            <select name="distance_to_school" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" defaultValue={val("distance_to_school")}>
                                <option value="Kurang dari 1 km">Kurang dari 1 km</option>
                                <option value="1 - 5 km">1 - 5 km</option>
                                <option value="5 - 10 km">5 - 10 km</option>
                                <option value="Lebih dari 10 km">Lebih dari 10 km</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Transportasi</Label>
                            <Input name="transport" defaultValue={val("transport")} placeholder="Misal: Jalan kaki, Sepeda Motor, Angkot" />
                        </div>
                    </div>
                </div>

                {/* --- ORANG TUA --- */}
                <div className={activeTab === "ortu" ? "block space-y-8" : "hidden"}>
                    {/* AYAH */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-green-700 border-b pb-2">Data Ayah Kandung</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Nama Ayah</Label>
                                <Input name="father_name" defaultValue={val("father_name")} required />
                            </div>
                            <div className="space-y-2">
                                <Label>NIK Ayah</Label>
                                <Input name="father_nik" defaultValue={val("father_nik")} />
                            </div>
                            <div className="space-y-2">
                                <Label>Tempat Lahir</Label>
                                <Input name="father_birth_place" defaultValue={val("father_birth_place")} />
                            </div>
                            <div className="space-y-2">
                                <Label>Tanggal Lahir</Label>
                                <Input name="father_birth_date" type="date" defaultValue={val("father_birth_date")} />
                            </div>
                            <div className="space-y-2">
                                <Label>Pendidikan Terakhir</Label>
                                <Input name="father_education" defaultValue={val("father_education")} />
                            </div>
                            <div className="space-y-2">
                                <Label>Pekerjaan</Label>
                                <Input name="father_job" defaultValue={val("father_job")} />
                            </div>
                            <div className="space-y-2">
                                <Label>Penghasilan Bulanan</Label>
                                <Input name="father_income" defaultValue={val("father_income")} />
                            </div>
                            <div className="space-y-2">
                                <Label>No. HP / WA</Label>
                                <Input name="father_phone" defaultValue={val("father_phone")} />
                            </div>
                        </div>
                    </div>

                    {/* IBU */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-green-700 border-b pb-2">Data Ibu Kandung</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Nama Ibu</Label>
                                <Input name="mother_name" defaultValue={val("mother_name")} required />
                            </div>
                            <div className="space-y-2">
                                <Label>NIK Ibu</Label>
                                <Input name="mother_nik" defaultValue={val("mother_nik")} />
                            </div>
                            <div className="space-y-2">
                                <Label>Tempat Lahir</Label>
                                <Input name="mother_birth_place" defaultValue={val("mother_birth_place")} />
                            </div>
                            <div className="space-y-2">
                                <Label>Tanggal Lahir</Label>
                                <Input name="mother_birth_date" type="date" defaultValue={val("mother_birth_date")} />
                            </div>
                            <div className="space-y-2">
                                <Label>Pendidikan Terakhir</Label>
                                <Input name="mother_education" defaultValue={val("mother_education")} />
                            </div>
                            <div className="space-y-2">
                                <Label>Pekerjaan</Label>
                                <Input name="mother_job" defaultValue={val("mother_job")} />
                            </div>
                            <div className="space-y-2">
                                <Label>Penghasilan Bulanan</Label>
                                <Input name="mother_income" defaultValue={val("mother_income")} />
                            </div>
                            <div className="space-y-2">
                                <Label>No. HP / WA</Label>
                                <Input name="mother_phone" defaultValue={val("mother_phone")} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SEKOLAH ASAL & KIP --- */}
                <div className={activeTab === "sekolah" ? "block space-y-6" : "hidden"}>
                    <div className="space-y-2">
                        <Label>Nama Sekolah Asal (SD / MI)</Label>
                        <Input name="school_origin" defaultValue={val("school_origin")} placeholder="Contoh: MIN 1 Labuhanbatu" required />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <h4 className="font-semibold mb-3">Kartu Indonesia Pintar (KIP) / PKH</h4>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="kip_status" name="kip_status" value="true" defaultChecked={initialData?.kip_status} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600" />
                                <Label htmlFor="kip_status" className="font-normal">Saya memiliki KIP / PKH / KKS</Label>
                            </div>
                            <div className="space-y-2 pl-6">
                                <Label>Nomor Kartu (Jika ada)</Label>
                                <Input name="kip_number" defaultValue={val("kip_number")} placeholder="Isi jika dicentang" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Action */}
                <div className="pt-8 mt-4 border-t">
                    <SubmitButton />
                    <p className="text-xs text-center text-gray-500 mt-4">
                        Pastikan semua data sudah benar sebelum disimpan. Data dapat diedit kembali selama periode pendaftaran dibuka.
                    </p>
                </div>
            </form>
        </div>
    );
}
