export type National = typeof NATIONAL
import { PROJECTS } from "./projects"
const ASSET_SUM = PROJECTS.reduce((a, b) => a + b.assets, 0)

export const STATS = {
  "asOf": "2026-11-20",
  "national": {
    "projects": 1557,
    "subitems": 3610,
    "inheritors": 3068,
    "inheritorsAlive": 3057,
    "recorded": 1805,
    "unesco": 42,
    "ecozones": 23,
    "byCategory": [
      [
        "传统技艺",
        287
      ],
      [
        "传统美术",
        139
      ],
      [
        "民俗",
        183
      ],
      [
        "传统音乐",
        189
      ],
      [
        "传统戏剧",
        171
      ],
      [
        "传统舞蹈",
        144
      ],
      [
        "传统医药",
        23
      ],
      [
        "曲艺",
        145
      ],
      [
        "民间文学",
        167
      ],
      [
        "传统体育、游艺与杂技",
        109
      ]
    ]
  },
  "platform": {
    "filed": 276,
    "assets": ASSET_SUM,
    "submitted": 198,
    "counties": 145,
    "provinces": 17,
    "inheritorFiled": 412,
    "inheritorRecorded": 96,
    "submittedAt": "2026-11-12"
  },
  "filedByCategory": {
    "传统技艺": 82,
    "传统美术": 54,
    "民俗": 33,
    "传统音乐": 28,
    "传统戏剧": 26,
    "传统舞蹈": 19,
    "传统医药": 14,
    "曲艺": 10,
    "民间文学": 6,
    "传统体育、游艺与杂技": 4
  },
  "filedByProvince": {
    "浙江省": 42,
    "江苏省": 34,
    "福建省": 26,
    "广东省": 24,
    "四川省": 22,
    "贵州省": 20,
    "云南省": 18,
    "山西省": 16,
    "陕西省": 14,
    "山东省": 13,
    "江西省": 11,
    "安徽省": 10,
    "北京市": 9,
    "上海市": 7,
    "湖南省": 5,
    "甘肃省": 3,
    "海南省": 2
  }
} as const
export const NATIONAL = STATS.national
export const PLATFORM = STATS.platform
