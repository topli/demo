export default {
  org: {
    title: '组织结构',
    form: {
      orgName: '组织名称',
      code: '编码',
      linkman: '联系人',
      phone: '手机号',
      parent: '父级',
      state: '状态'
    },
    formError: {
      orgName: '组织名称不能为空',
      deleteError: '该节点存在子级不能删除',
      parentName: '请选择先选择父级'
    }
  }
}
