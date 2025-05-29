import React from "react";

const Policy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">Chính sách đổi trả</h1>
      <div className="border p-6 bg-white text-black text-base rounded">
        <p>
          Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách
          hàng. Nếu sản phẩm không phù hợp, quý khách có thể đổi/trả theo các
          điều kiện dưới đây.
        </p>
        <ol className="list-decimal ml-6 mt-4 space-y-2">
          <li>
            <b>Điều kiện áp dụng đổi/trả</b>
            <ul className="list-disc ml-6 mt-1">
              <li>
                Sản phẩm chưa qua sử dụng, chưa giặt ủi, còn nguyên tem mác,
                nguyên kiện bao bì như ban đầu.
              </li>
              <li>
                Sản phẩm không bị dơ bẩn, không có mùi lạ, không bị rách hoặc hư
                hỏng do tác động từ khách hàng.
              </li>
              <li>Có hóa đơn mua hàng hoặc bằng chứng giao dịch hợp lệ.</li>
              <li>
                Áp dụng cho sản phẩm mua tại Luon VuiTuoi, không áp dụng cho sản
                phẩm từ bên thứ ba hoặc nhà bán hàng khác.
              </li>
            </ul>
          </li>
          <li>
            <b>Hình thức đổi/trả</b>
            <ul className="list-disc ml-6 mt-1">
              <li>
                <b>Đổi hàng:</b> Được đổi sang sản phẩm khác cùng loại (màu sắc,
                kích cỡ) hoặc sản phẩm khác có giá trị tương đương hoặc cao hơn
                (bù phần chênh lệch).
              </li>
              <li>
                <b>Trả hàng & hoàn tiền:</b>
                <ul className="list-disc ml-6 mt-1">
                  <li>
                    Chỉ áp dụng khi sản phẩm bị lỗi từ nhà sản xuất hoặc giao
                    sai hàng.
                  </li>
                  <li>
                    Tiền hoàn trả qua chuyển khoản ngân hàng hoặc voucher mua
                    sắm trong vòng 07 ngày sau khi xác nhận sản phẩm hợp lệ.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <b>Quy trình đổi/trả</b>
            <ul className="list-disc ml-6 mt-1">
              <li>
                Liên hệ với bộ phận chăm sóc khách hàng qua hotline: 0901 234
                567 hoặc email: support@luonvuituoi.com để gửi yêu cầu đổi/trả.
              </li>
              <li>
                Đóng gói sản phẩm và gửi về địa chỉ 123 Đường ABC, TP. HCM hoặc
                cửa hàng gần nhất theo hướng dẫn.
              </li>
              <li>
                Chúng tôi kiểm tra sản phẩm và xử lý đổi/trả trong vòng 3 - 5
                ngày làm việc.
              </li>
            </ul>
          </li>
          <li>
            <b>Sản phẩm không áp dụng đổi/trả</b>
            <ul className="list-disc ml-6 mt-1">
              <li>
                Sản phẩm thuộc danh mục đồ lót, đồ bơi, tất/vớ, hoặc các sản
                phẩm giảm giá đặc biệt.
              </li>
              <li>
                Sản phẩm đã qua sử dụng, giặt ủi, bị rách, bị hư hỏng do khách
                hàng.
              </li>
              <li>
                Sản phẩm không có hóa đơn hoặc bằng chứng mua hàng hợp lệ.
              </li>
            </ul>
          </li>
          <li>
            <b>Chi phí đổi/trả</b>
            <ul className="list-disc ml-6 mt-1">
              <li>
                Nếu đổi/trả do lỗi nhà sản xuất hoặc sai sót trong đơn hàng,
                chúng tôi sẽ hỗ trợ toàn bộ chi phí vận chuyển.
              </li>
              <li>
                Nếu khách hàng chủ động muốn đổi ý, khách hàng sẽ tự chịu chi
                phí vận chuyển.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Policy;
