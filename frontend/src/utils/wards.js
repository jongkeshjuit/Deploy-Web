// Sử dụng API https://provinces.open-api.vn/api/ để lấy dữ liệu địa giới hành chính động
// Hàm fetch danh sách tỉnh/thành phố
export async function fetchCities() {
  const res = await fetch("https://provinces.open-api.vn/api/p/");
  if (!res.ok) throw new Error("Không thể lấy danh sách tỉnh/thành");
  return await res.json();
}

// Hàm fetch danh sách quận/huyện theo mã tỉnh/thành
export async function fetchDistricts(provinceCode) {
  const res = await fetch(
    `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
  );
  if (!res.ok) throw new Error("Không thể lấy danh sách quận/huyện");
  const data = await res.json();
  return data.districts;
}

// Hàm fetch danh sách phường/xã theo mã quận/huyện
export async function fetchWards(districtCode) {
  const res = await fetch(
    `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
  );
  if (!res.ok) throw new Error("Không thể lấy danh sách phường/xã");
  const data = await res.json();
  return data.wards;
}
