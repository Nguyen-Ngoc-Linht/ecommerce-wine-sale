<template>
  <div class="w-100" :style="backgroundStyle">
    <div class="container">
      <div class="pt-5"></div>
      <div class="row px-5">
        <div class="col-5">
          <div class="w-100 h-100 d-flex align-items-center justify-content-center">
            <img src="~/assets/img/icons/anh_tu.png" alt="lanh_dao" class="w-100" style="object-fit: contain">
          </div>
        </div>
        <div class="col-7 px-4">
          <h3 class="text-black">Thông điệp từ lãnh đạo</h3>
          <p>Kính thưa quý Đối tác!</p>
          <p class="text-justify mt-3">
            Trên chuyến hành trình dài bất tận khi khai thác và chiêm nghiệm văn hóa Rượu Vang,
            tôi đã có may mắn được quen biết rất nhiều người thầy, người bạn,
            với những hoài bão quyết liệt và tài năng phải nói là tuyệt vời.
            Trên hành trình đó, tôi ngày một tích lũy cho bản thân những kinh nghiệm quý giá
            và một giấc mơ được lan tỏa nét văn hóa thưởng thức duy mỹ này.
          </p>
          <p class="text-justify mt-3">
            Thành công – hai tiếng thật đơn giản nhưng con đường đi đến đó chưa bao giờ là dễ dàng.
            “Thành công là những phép cộng của tất cả nỗ lực nhỏ, được lặp đi lặp lại qua ngày”,
            những thành quả Soul Wine có được ngày hôm nay chính là kết quả của một
            hành trình phấn đâu không ngừng, trải nghiệm trên từng quốc gia để đúc kết được
            những gì tinh túy nhất.
          </p>
          <p class="text-justify mt-3">
            Và dù, thật tự hào vì những gì Soul Wine đã gây dựng,
            chúng tôi hiểu rõ tất cả mới chỉ là điểm khởi đầu.
            Chúng tôi đã và đang không ngừng cố gắng để mang lại những trải nghiệm thưởng thức
            các loại Rượu vang danh tiếng nhất, đẳng cấp nhất trên thế giới,
            được nhập khẩu chính hãng từ các quốc gia nổi tiếng về các loại vang như:
            Ý, Pháp, Chile, Tây Ban Nha, Nam Phi, NewZealand, Mỹ,….
          </p>
          <p class="text-justify mt-3">
            Soul Wine – đang trên con đường khẳng định Khát vọng,
            Mục tiêu để từng bước mang lại những giá trị tuyệt vời tới Khách hàng
            trong nghệ thuật Rượu Vang nói riêng và các mặt hàng đồ uống cao cấp nói chung.
          </p>
        </div>
      </div>
      <div class="w-100 mt-5 pt-5">
        <h3 class="text-center">GIÁ TRỊ CỐT LÕI</h3>
        <div class="row mt-5">
          <div class="col-4">
            <h4 class="text-center text-black">TẦM NHÌN</h4>
            <p class="text-center text-black-50 text-lg">
              Khát vọng tiên phong, trở thành Doanh nghiệp hàng đầu Việt Nam về
              lĩnh vực kinh doanh và nhập khẩu sản phẩm Rượu Vang,
              Đồ uống cao cấp và các phân khúc Quà tặng,
              mang lại những trải nghiệm giá trị riêng biệt cho Khách hàng và Đối tác.
            </p>
          </div>
          <div class="col-4">
            <h4 class="text-center text-black">UY TÍN - CHUYÊN NGHIỆP</h4>
            <p class="text-center text-black-50 text-lg">
              Luôn luôn tập trung để mang lại những trải nghiệm tuyệt vời nhất
              tới Khách hàng với mục tiêu lấy Khách hàng làm trọng tâm.
              Đó chính là chìa khóa thành công của Doanh nghiệp.
            </p>
          </div>
          <div class="col-4">
            <h4 class="text-center text-black">SỨ MỆNH</h4>
            <p class="text-center text-black-50 text-lg">
              Đưa văn hóa rượu vang và nghệ thuật thưởng thức rượu vang tới gần hơn
              với đời sống con người Việt Nam. Chúng tôi luôn lắng nghe và thấu hiểu
              nhu cầu của khách hàng để tư vấn cho phù hợp.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      background_image: 'https://winecellar.vn/wp-content/uploads/2024/12/bg-main-tet-wcl-3.jpg',
    }
  },
  computed: {
    backgroundStyle() {
      return this.background_image
        ? {
          backgroundImage: `url(${this.background_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }
        : {};
    },
  },
}
</script>
