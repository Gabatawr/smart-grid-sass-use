class Replaces {
  constructor(resources) {
    this.resources = resources;
  }

  all(str, style) {
    let replaces = {
      scss: {
        '{{var}}': '$',
        '{{=}}': ': ',
        '{{string-var}}': '#{$',
        '{{/string-var}}': '}',
        '{{i}}': '#{',
        '{{/i}}': '}',
        '{{before_mixin}}': '@mixin ',
        '{{call}}': '@include ',
        '{{call_with_content}}': '@include ',
        '{{brace}}': '{',
        '{{/brace}}': '}',
        '{{:}}': ': ',
        '{{;}}': ';',
        '{{block-content-var-delimeter}}': '',
        '{{block-content-var}}': '',
        '{{block-content-extract}}': '@content',
        '{{block_callable_brace}}': '(){\n',
        '{{/block_callable_brace}}': '}'
      },
      sass: {
        '{{var}}': '$',
        '{{=}}': ': ',
        '{{string-var}}': '#{$',
        '{{/string-var}}': '}',
        '{{i}}': '#{',
        '{{/i}}': '}',
        '{{before_mixin}}': '=',
        '{{call}}': '+',
        '{{call_with_content}}': '+',
        '{{brace}}': '',
        '{{/brace}}': '',
        '{{:}}': ': ',
        '{{;}}': '',
        '{{block-content-var-delimeter}}': '',
        '{{block-content-var}}': '',
        '{{block-content-extract}}': '@content',
        '{{block_callable_brace}}': '()\n',
        '{{/block_callable_brace}}': ''
      }
    };

    if (replaces[style] === undefined) {
      throw new Error("smartgrid doesn't have output style \"" + style + "\"");
    }

    let active = replaces[style];
    active['{{tab}}'] = this.resources.settings.tab;

    let out = str;

    for (let key in active) {
      let tmp = out.split(key);
      out = tmp.join(active[key]);
    }

    out = out.replace('{{device}}', this.resources.settings.defaultMediaDevice, 'g');

    return out;
  }

  fixLines(str) {
    let reg = new RegExp(`\n(${this.resources.settings.tab})*\n\n`, 'g');

    str = str.replace(/\r\n/g, '\n');

    while (str.match(reg) !== null) {
      str = str.replace(reg, '\n\n');
    }

    return str;
  }
}

module.exports = Replaces;