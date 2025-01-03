const actions = {
};

const state = () => ({
  listTab: [
    {
      id: 'hoasmdken',
      icon: 'home',
      name: 'Thông tin chung',
      path: '/cms',
      permission: '',
      children: [
      ]
    },
    {
      id: '2',
      icon: 'category',
      name: 'Quản lý danh mục',
      path: '/cms/quan-ly-danh-muc',
      permission: '',
      children: [
      ]
    },
    {
      id: '3',
      icon: 'user',
      name: 'Quản lý người dùng',
      path: '/cms/quan-ly-nguoi-dung',
      permission: '',
      children: [
      ]
    },
    {
      id: '4',
      icon: 'product',
      name: 'Sản phẩm',
      path: '/',
      permission: '',
      children: [
        {
          id: '4-1',
          icon: 'product',
          name: 'Quản lý sản phẩm',
          path: '/cms/quan-ly-san-pham',
          permission: '',
          children: [
          ]
        },
        {
          id: '4-2',
          icon: 'thuoctinh',
          name: 'Quản lý thuộc tính',
          path: '/cms/quan-ly-thuoc-tinh',
          permission: '',
          children: [
          ]
        },
      ]
    },
  ],
});

const getters = {
  getListTab(state) {
    return state.listTab
  }
};

const mutations = {};

export default {
  actions,
  state,
  getters,
  mutations,
};
