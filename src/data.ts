import { Palette } from './types';

export const PALETTES: Palette[] = [
  {
    key: "rose", 
    name: "品牌主色", 
    sub: "破曉之光・理念與形象", 
    hex: "#FF7A7B",
    phrase: "the scene rendered in warm signature brand tones of dawn coral-rose and soft blush, warm and gentle",
    mood: "a warm, hopeful atmosphere, gentle and unhurried, reflecting brand ideals and core identity",
    shades: [
      { key: "tint", label: "Rose 50", hex: "#FFEAE7", depthLabel: "a pale blush tint" },
      { key: "soft", label: "Rose 100", hex: "#FFE1DE", depthLabel: "a soft blush shade" }
    ],
    items: [
      "晨曦雲彩 dawn-lit clouds", "蓮花 lotus flower", "玫瑰花瓣 rose petals", "貝殼內壁 seashell interior",
      "粉晶石 rose quartz stone", "柔霧晨光 misty dawn light", "暖粉石英 warm pink quartz", "絲質薄紗 silk sheer fabric"
    ]
  },
  {
    key: "violet", name: "紫羅蘭", sub: "VIOLET", hex: "#C78AC8",
    phrase: "the scene rendered in tranquil violet, soft amethyst and lavender tones, quiet and spiritual",
    mood: "a peaceful, spiritual atmosphere, poetic and deeply calming",
    shades: [
      { key: "tint", label: "Tint", hex: "#F5EDF6", depthLabel: "a very pale violet tint" },
      { key: "soft", label: "Soft", hex: "#EAD7EA", depthLabel: "a soft lavender shade" }
    ],
    items: [
      "薰衣草田 lavender field", "暮色天空 twilight sky", "繚繞煙霧 drifting smoke", "紫水晶 amethyst crystal",
      "鳶尾花 iris flower", "無花果切面 fig cross-section", "紫玉髓 purple chalcedony", "夜幕薄紗 evening voile curtain"
    ]
  },
  {
    key: "sky", name: "天空", sub: "SKY", hex: "#88A0C7",
    phrase: "the scene rendered in vast open sky blue, clear azure and airy daylight tones",
    mood: "an open, liberating atmosphere, clear-sighted and expansive",
    shades: [
      { key: "tint", label: "Tint", hex: "#EDF0F6", depthLabel: "a pale airy azure tint" },
      { key: "soft", label: "Soft", hex: "#D7DEEA", depthLabel: "a soft light sky blue" }
    ],
    items: [
      "晴空 open sky", "海浪 ocean wave", "湖面倒影 lake reflection", "天然藍染布 indigo-dyed linen",
      "天青瓷器 celadon porcelain", "晨光藍霧 morning blue mist", "水平線 horizon line", "海浪漣漪 ocean ripple"
    ]
  },
  {
    key: "lake", name: "湖水", sub: "LAKE", hex: "#82B6C6",
    phrase: "the scene rendered in still lake teal, soft aqua and muted cyan tones",
    mood: "a still, precise atmosphere, clear-minded and composed",
    shades: [
      { key: "tint", label: "Tint", hex: "#EDF4F6", depthLabel: "a pale aqua tint" },
      { key: "soft", label: "Soft", hex: "#D5E4EA", depthLabel: "a soft muted aqua blue" }
    ],
    items: [
      "靜止水面 still water surface", "海玻璃 sea glass", "水波紋 rippling water", "水滴 water droplet",
      "睡蓮浮葉 floating lily pad", "清澈溪流 flowing stream", "湖底圓卵石 lakebed pebbles", "薄荷嫩葉 fresh mint leaf"
    ]
  },
  {
    key: "moss", name: "青苔", sub: "MOSS", hex: "#78B4AA",
    phrase: "the scene rendered in quiet mossy green, soft sage and deep forest green tones",
    mood: "a hushed, introspective atmosphere, settled and restrained",
    shades: [
      { key: "tint", label: "Tint", hex: "#ECF5F2", depthLabel: "a pale sage tint" },
      { key: "soft", label: "Soft", hex: "#D4EAE6", depthLabel: "a soft muted sage green" }
    ],
    items: [
      "苔蘚地衣 moss and lichen", "蕨類葉片 fern fronds", "針葉松枝 pine needles", "抹茶細粉 matcha powder",
      "老樹樹皮 aged tree bark", "晨露凝結 morning dew drop", "濕潤苔石 damp mossy stone", "雨後松林 pine forest after rain"
    ]
  },
  {
    key: "verdant", name: "草木", sub: "VERDANT", hex: "#C0CEA8",
    phrase: "the scene rendered in fresh botanical green, tender herbal leaves and gentle sunlight hues",
    mood: "a vibrant yet gentle atmosphere, rejuvenating and naturally alive",
    shades: [
      { key: "tint", label: "Tint", hex: "#F0F5EC", depthLabel: "a pale tender sprout tint" },
      { key: "soft", label: "Soft", hex: "#D9EAD6", depthLabel: "a soft meadow green shade" }
    ],
    items: [
      "嫩芽新葉 fresh green sprout", "清幽竹林 bamboo grove", "柔嫩草地 meadow grass", "春日新生枝芽 budding spring branch",
      "橄欖樹枝 olive branch", "清新檸檬葉 lemon leaf", "草尖晨珠 dew on blade tip", "迷迭香草 fresh rosemary herb"
    ]
  },
  {
    key: "earth", name: "大地", sub: "EARTH", hex: "#DCB163",
    phrase: "the scene rendered in grounded ochre, warm amber and terracotta clay tones",
    mood: "a grounded, abundant atmosphere, ritualistic and steady",
    shades: [
      { key: "tint", label: "Tint", hex: "#F8F0E2", depthLabel: "a pale terracotta tint" },
      { key: "soft", label: "Soft", hex: "#F1E0C2", depthLabel: "a soft muted amber shade" }
    ],
    items: [
      "岩石紋理 rock texture", "沙丘曲線 dune curve", "木紋肌理 wood grain texture", "素燒陶器 fired ceramic vessel",
      "金色麥穗 golden wheat ear", "黃昏微光 dusk twilight", "秋季芒草 silvergrass meadow", "暖色砂岩 warm sandstone"
    ]
  },
  {
    key: "warmgray",
    name: "暖灰",
    sub: "WARM GRAY",
    hex: "#F6F1ED",
    phrase: "the scene rendered in gentle warm gray and subtle neutral tones",
    mood: "a calm, grounding and warm neutral atmosphere",
    shades: [
      { key: "tint", label: "Gray 50", hex: "#FDF9F6", depthLabel: "a very pale warm gray tint" },
      { key: "soft", label: "Gray 100", hex: "#F6F1ED", depthLabel: "a soft warm gray shade" }
    ],
    items: []
  }
];

export const PRIMARY_PALETTE = PALETTES[0];
export const SECONDARY_PALETTES = PALETTES.slice(1);

export const STORAGE_KEY = "brand-gradient-generator-v1";
