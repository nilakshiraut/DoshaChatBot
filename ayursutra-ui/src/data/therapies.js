import vamanaImage from '../assets/vamana.png'; 
import VirechanaImage from '../assets/Virechana (2).png';
import BastiImage from '../assets/Basti.png'; 
import NasyaImage from '../assets/Nasya.png';  
import RaktamokshanaImage from '../assets/Raktamokshana.png';  

export const therapies = [
  {
    id: 1,
    name: "Vamana",
    image: vamanaImage,
    description: "Therapeutic vomiting procedure for Kapha dosha elimination and respiratory health."
  },
  {
    id: 2,
    name: "Virechana",
    image: VirechanaImage ,
    description: "Therapeutic purgation procedure for Pitta dosha purification and digestive health."
  },
  {
    id: 3,
    name: "Basti",
    image: BastiImage , 
    description: "Therapeutic enema procedure for Vata dosha balance and nervous system health."
  },
  {
    id: 4,
    name: "Nasya",
    image: NasyaImage ,
    description: "Nasal therapy procedure for head, neck, and respiratory system purification."
  },
  {
    id: 5,
    name: "Raktamokshana",
    image: RaktamokshanaImage ,
    description: "Therapeutic bloodletting procedure for blood purification and toxin removal."
  }
];

export const sampleDoshaResults = {
  percentages: {
    vata: 45,
    pitta: 35,
    kapha: 20
  },
  dominant_dosha: 'vata',
  secondary_dosha: 'pitta'
};

export const sampleChatMessages = [
  {
    id: 1,
    text: "Hello! I'm your AyurSutra wellness assistant. I can help you understand your dosha type and recommend personalized therapies.",
    sender: 'bot',
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    text: "I'd like to learn about my dosha type",
    sender: 'user',
    timestamp: new Date().toISOString()
  },
  {
    id: 3,
    text: "Great! Let's start with a quick assessment. What's your age range?",
    sender: 'bot',
    timestamp: new Date().toISOString(),
    isQuestion: true,
    options: ["18-25", "26-35", "36-50", "50+"]
  }
];

export const doshaDietaryRecommendations = {
  vata: {
    general: "Warm, nourishing, and grounding foods are best for balancing Vata. Focus on sweet, sour, and salty tastes.",
    foodsToFavor: [
      "Warm, cooked grains (oats, rice)",
      "Root vegetables (sweet potatoes, carrots)",
      "Ghee, healthy oils",
      "Dairy products",
      "Sweet fruits (bananas, berries)",
      "Lentils, mung beans"
    ],
    foodsToAvoid: [
      "Cold, raw foods",
      "Dry, crunchy foods",
      "Bitter, pungent, astringent tastes",
      "Most beans (except mung beans)",
      "Excessive caffeine"
    ]
  },
  pitta: {
    general: "Cooling, slightly dry, and substantial foods help pacify Pitta. Favor sweet, bitter, and astringent tastes.",
    foodsToFavor: [
      "Sweet fruits (melons, grapes)",
      "Green leafy vegetables",
      "Grains (barley, rice, wheat)",
      "Legumes (chickpeas, lentils)",
      "Cooling spices (fennel, coriander)",
      "Ghee, coconut oil"
    ],
    foodsToAvoid: [
      "Hot, spicy foods",
      "Sour, salty, pungent tastes",
      "Fermented foods",
      "Red meat",
      "Excessive oil",
      "Alcohol, caffeine"
    ]
  },
  kapha: {
    general: "Light, warm, and stimulating foods are ideal for Kapha balance. Emphasize pungent, bitter, and astringent tastes.",
    foodsToFavor: [
      "Light, dry grains (millet, barley)",
      "Leafy greens, most vegetables",
      "Pungent spices (ginger, chili, black pepper)",
      "Lighter legumes (lentils)",
      "Honey (in moderation)",
      "Warm, light beverages"
    ],
    foodsToAvoid: [
      "Heavy, oily, cold foods",
      "Sweet, sour, salty tastes",
      "Dairy products",
      "Excessive wheat, rice",
      "Cold drinks",
      "Sugary foods"
    ]
  }
};
