<style rel="stylesheet/scss" lang="scss">
  @import './style.scss';
</style>
<template>
  <div class="menu-tree">
    <div class=" custom-tree-container">
      <div class="block">
        <p>{{$t('org.title')}}</p>
        <el-tree
          :data="treeData"
          :show-checkbox="false"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
          @node-contextmenu="showMenu">
        </el-tree>
      </div>
      <div class="block">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item :label="$t('org.fromTitle.orgName')" prop="orgName">
            <el-input v-model="form.orgName"></el-input>
          </el-form-item>
          <el-form-item :label="$t('org.fromTitle.code')" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item :label="$t('org.fromTitle.linkman')" prop="linkman">
            <el-input v-model="form.linkman"></el-input>
          </el-form-item>
          <el-form-item :label="$t('org.fromTitle.phone')" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item :label="$t('org.fromTitle.parent')" prop="parentName">
            <el-input v-model="form.parentName" disabled></el-input>
            <el-input v-model="form.parenId" v-show="false"></el-input>
          </el-form-item>
          <el-form-item :label="$t('org.fromTitle.state')" prop="state">
            <el-switch v-model="form.state"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button v-if="form.id" type="primary" @click="submitForm('form')">{{$t('org.fromTitle.edit')}}</el-button>
            <el-button v-else type="primary" @click="submitForm('form')">{{$t('org.fromTitle.add')}}</el-button>
            <el-button @click="resetForm('form')">{{$t('org.fromTitle.reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import { deepClone } from '@/libs/utils';

  export default {
    data() {
      const data = [
        {
          id: 9999,
          orgName: '顶级机构',
          type: 'org',
          children: [
            {
              id: 1,
              orgName: '部门1',
              state: true,
              code: 'BM1',
              linkman: '张三',
              phone: '13211111111',
              parentId: 9999,
              parentName: '顶级机构',
              parentType: 'org'
            },
            {
              id: 2,
              orgName: '部门2',
              state: true,
              code: 'BM2',
              linkman: '李四',
              phone: '1322222222',
              parentId: 9999,
              parentName: '顶级机构',
              parentType: 'org',
              children: [
                {
                  id: 5,
                  orgName: '子部门1',
                  state: true,
                  code: 'ZBM1',
                  linkman: '王五',
                  phone: '1313333333',
                  parentId: 2,
                  parentName: '部门2'
                }, {
                  id: 6,
                  orgName: '子部门2',
                  state: true,
                  code: 'ZBM2',
                  linkman: '赵六',
                  phone: '1511111111',
                  parentId: 2,
                  parentName: '部门2'
                }
              ]
            }]
        }];
      return {
        dialogBox: false,
        iconsMap: [],
        treeData: JSON.parse(JSON.stringify(data)),
        form: {
          type: '1',
          name: '',
          parentName: '',
          parenId: '',
          parentType: '',
          show: true,
          code: '',
          icon: ''
        },
        rules: {
          orgName: [
            { required: true, message: this.$t('org.errorTip.orgName'), trigger: 'blur' }
          ]
        }
      };
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      handleClipboard(text, event) {
        this.form.icon = text;
        this.handleClose();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      append(item) {
        console.log(item);
        // todo 右侧显示新增页面
        this.form.parentName = item.data.orgName;
        this.form.parentId = item.data.id;
        this.form.state = true;
      },
      edit(item) {
        // todo 右侧显示修改页面
        this.form = deepClone(item.data);
      },
      remove(item) {
        if (item.data && item.data.children && item.data.children.length > 0) {
          this.$message.error({ message: '该节点存在子级不能删除' });
          return;
        }
        const parent = item.node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === item.data.id);
        this.$confirm('确定要删除该节点吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // todo 调用后台删除菜单api
          children.splice(index, 1);
          this.treeData = Object.assign([], this.treeData);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      renderIconBtn(h, data, props, fun, hide) {
        if (hide) return null;
        return h('icon-btn', {
          props: props,
          on: {
            click: () => {
              fun && fun(data);
            }
          }
        });
      },
      renderContent(h, { node, data, store }) {
        return h('span', { class: { 'custom_content': true }},
          [
            h('span', { class: { 'title': true }}, data.orgName),
            h('span', [
              this.renderIconBtn(h, { node, data, store }, { icon: 'add', content: '新增' }, this.append),
              this.renderIconBtn(h, { node, data, store }, { icon: 'edit', content: '编辑' }, this.edit, data.type === 'org'),
              this.renderIconBtn(h, { node, data, store }, { icon: 'delete', content: '删除' }, this.remove, data.type === 'org')
            ])
          ]);
      },
      handleClose() {
        this.dialogBox = false;
      },
      getCurrentNode(node) {
        this.form = node;
      },
      showMenu(e, d, n, c) {
        // 右键事件
      },
      changeType(val) {
        if (this.form.type === '2') {
          this.rules.code = { required: true, message: this.$t('resources.errorTip.code'), trigger: 'blur' };
        } else {
          this.rules.code = { required: false };
        }
      }
    }
  };
</script>
