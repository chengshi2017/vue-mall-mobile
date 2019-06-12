export default function createIcon(options: { scriptUrl: String }) {
  let scriptUrl = options.scriptUrl;
  if (
    document !== undefined &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function' &&
    typeof scriptUrl === 'string' &&
    scriptUrl.length
  ) {
    let script: Element = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    document.body.appendChild(script);
  }

  const iconClass: Function = function(className: Array<String> | String) {
    let classObj: Array<String> = ['icon-font'];
    if (Array.isArray(className)) {
      for (let item of className) {
        classObj.push(item);
      }
    } else {
      classObj.push(className);
    }
    return classObj.join('');
  };

  return {
    functional: true,
    name: 'Icon',
    render: function(h: Function, context: any) {
      let props = context.props,
        listener = context.listener,
        data = context.data;
      return h(
        'svg',
        {
          style: data.style,
          class: iconClass(props.className),
          on: listener
        },
        [h('use', { attrs: { 'xlink:href': '#' + props.type } })]
      );
    }
  };
}
