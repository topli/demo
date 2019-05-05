/**
 * render创建图标按钮
 * @param h
 * @param params
 * @param iconBtns
 * @returns {Array}
 */
export function iconBtn(h, params, iconBtns) {
  const btns = []
  iconBtns.forEach((item) => {
    if (!item.hide) {
      btns.push(h('icon-btn', {
        props: {
          icon: item.icon,
          content: this.$t(item.t),
          authCode: item.authCode || ''
        },
        on: {
          click() {
            item.handler && item.handler(params.row)
          }
        }
      }))
    }
  })
  return btns
}

/**
 * render创建提示
 * @param h
 * @param tipStr
 * @returns {*}
 */
export function iconTooltip(h, tipStr) {
  return h('el-tooltip',
    {
      props: { placement: 'top', content: tipStr, openDelay: 500 },
      style: { padding: '0 5px' }
    },
    [h('i',
      {
        'class': {
          'el-icon-question': true
        }
      })
    ]
  )
}

/**
 * render创建Select
 * @param h
 * @returns {*}
 */
export function tSelect(h, props, options) {
  return h('el-select', {
    on: {
      'on-change': (v) => {
        console.log(v)
      }
    }
  }, [
    h('el-option', {
      props: {
        value: '1',
        label: '且'
      }
    }),
    h('el-option', {
      props: {
        value: '2',
        label: '或'
      }
    })
  ])
}
