export type Person = {
  name: string
  gender: '男' | '女'
  birth: number | null
  batch: string
  status: string | null
  source: string
}

export type InheritorGroup = {
  verified: boolean
  source: string
  list: Person[]
}

export const INHERITORS: Record<string, InheritorGroup> = {
  'Ⅷ-9': { verified: true, source: 'https://www.ihchina.cn/project_details/20103.html', list: [
    { name: '徐朝兴', gender: '男', birth: 1943, batch: '第一批 2007', status: null, source: 'https://www.ihchina.cn/ccr_detail/2981.html' },
    { name: '毛正聪', gender: '男', birth: 1940, batch: '第四批 2012', status: null, source: 'https://www.ihchina.cn/ccr_detail/3199.html' },
    { name: '张绍斌', gender: '男', birth: 1957, batch: '第五批 2018', status: '已故', source: 'https://www.ihchina.cn/ccr_detail/3304.html' },
  ]},
  'Ⅷ-1': { verified: true, source: 'https://www.ihchina.cn/project_details/14261.html', list: [
    { name: '汪寅仙', gender: '女', birth: 1943, batch: '第一批 2007', status: '已故', source: 'https://www.thepaper.cn/newsDetail_forward_2012828' },
    { name: '吕尧臣', gender: '男', birth: 1940, batch: '第四批 2012', status: null, source: 'https://www.ihchina.cn/ccr_detail/3189.html' },
    { name: '周桂珍', gender: '女', birth: 1943, batch: '第五批 2018', status: null, source: 'https://www.ihchina.cn/ccr_detail/3300.html' },
  ]},
  'Ⅷ-7': { verified: true, source: 'https://www.ihchina.cn/project_details/14270.html', list: [
    { name: '曹开永', gender: '男', birth: 1939, batch: '第三批 2009', status: null, source: 'https://www.ihchina.cn/ccr_detail/3054.html' },
    { name: '邓希平', gender: '女', birth: 1942, batch: '第四批 2012', status: null, source: 'https://www.ihchina.cn/ccr_detail/3195.html' },
    { name: '朱丹忱', gender: '男', birth: 1955, batch: '第四批 2012', status: null, source: 'https://www.ihchina.cn/ccr_detail/3196.html' },
  ]},
  'Ⅷ-13': { verified: true, source: 'https://www.ihchina.cn/project_details/14276.html', list: [
    { name: '朱枫', gender: '男', birth: 1915, batch: '第一批 2007', status: '已故', source: 'https://www.ihchina.cn/ccr_detail/2985.html' },
    { name: '周双喜', gender: '男', birth: 1955, batch: '第三批 2009', status: null, source: 'https://www.ihchina.cn/ccr_detail/3055.html' },
    { name: '金文', gender: '男', birth: 1954, batch: '第三批 2009', status: null, source: 'https://www.ihchina.cn/ccr_detail/3056.html' },
  ]},
  'Ⅷ-15': { verified: true, source: 'https://www.ihchina.cn/project_details/14279.html', list: [
    { name: '王金山', gender: '男', birth: 1939, batch: '第一批 2007', status: null, source: 'https://www.ihchina.cn/ccr_detail/2987.html' },
  ]},
  'Ⅷ-65': { verified: true, source: 'https://www.ihchina.cn/project_details/14376.html', list: [
    { name: '邢春荣', gender: '男', birth: 1954, batch: '第一批 2007', status: null, source: 'https://www.ihchina.cn/ccr_detail/3032.html' },
    { name: '曹光华', gender: '男', birth: 1954, batch: '第五批 2018', status: null, source: 'https://www.ihchina.cn/ccr_detail/3342.html' },
  ]},
  'Ⅷ-72': { verified: true, source: 'https://www.ihchina.cn/project_details/14395.html', list: [
    { name: '邱昌明', gender: '男', birth: 1950, batch: '第一批 2007', status: null, source: 'https://www.ihchina.cn/ccr_detail/3039.html' },
  ]},
  'Ⅷ-73': { verified: true, source: 'https://www.ihchina.cn/project_details/14398.html', list: [
    { name: '周美洪', gender: '男', birth: 1957, batch: '第一批 2007', status: null, source: 'https://www.ihchina.cn/ccr_detail/3040.html' },
    { name: '汪爱军', gender: '男', birth: 1965, batch: '第三批 2009', status: null, source: 'https://www.ihchina.cn/ccr_detail/3082.html' },
    { name: '汪培坤', gender: '男', birth: 1950, batch: '第五批 2018', status: null, source: 'https://www.ihchina.cn/ccr_detail/3349.html' },
  ]},
  'Ⅷ-24': { verified: true, source: 'https://www.ihchina.cn/project_details/14296.html', list: [
    { name: '吴元新', gender: '男', birth: 1960, batch: '第一批 2007', status: null, source: 'https://www.ihchina.cn/ccr_detail/2998.html' },
    { name: '王振兴', gender: '男', birth: 1939, batch: '第四批 2012', status: null, source: 'https://www.ihchina.cn/ccr_detail/3204.html' },
  ]},
  'Ⅷ-25': { verified: true, source: 'https://www.ihchina.cn/project_details/14300.html', list: [
    { name: '王阿勇', gender: '女', birth: 1944, batch: '第四批 2012', status: '已故', source: 'https://www.ihchina.cn/ccr_detail/3205.html' },
    { name: '杨芳', gender: '女', birth: 1966, batch: '第五批 2018', status: null, source: 'https://www.ihchina.cn/ccr_detail/3316.html' },
  ]},
  'Ⅷ-88': { verified: true, source: 'https://www.ihchina.cn/project_details/14434.html', list: [
    { name: '韩福龄', gender: '男', birth: 1934, batch: '第三批 2009', status: null, source: 'https://www.ihchina.cn/ccr_detail/3093.html' },
    { name: '张效东', gender: '男', birth: 1949, batch: '第五批 2018', status: null, source: 'https://www.ihchina.cn/ccr_detail/3362.html' },
  ]},
  'Ⅷ-3': { verified: true, source: 'https://www.ihchina.cn/project_details/14263.html', list: [
    { name: '刘泽棉', gender: '男', birth: 1937, batch: '第一批 2007', status: null, source: 'https://www.ihchina.cn/ccr_detail/2977.html' },
    { name: '黄松坚', gender: '男', birth: 1941, batch: '第四批 2012', status: '已故', source: 'https://www.ihchina.cn/ccr_detail/3190.html' },
    { name: '廖洪标', gender: '男', birth: 1936, batch: '第四批 2012', status: null, source: 'https://www.ihchina.cn/ccr_detail/3191.html' },
  ]},
}
