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
    general: "Warm, nourishing, and grounding foods are best for balancing Vata. Focus on sweet, sour, and salty tastes. Cook vegetables to make them more digestible.",
    foodsToFavor: [
      "Sweet fruits (bananas, berries, apples, grapes, mangoes, melons)",
      "Cooked root vegetables (carrots, sweet potatoes, beets)",
      "Warm, cooked grains (rice, oats, wheat)",
      "Ghee and healthy oils",
      "Dairy products (milk, yogurt, cheese)",
      "Lentils and mung beans",
      "Warm spices (ginger, cinnamon, cumin, coriander)",
      "Nuts and seeds in moderation"
    ],
    foodsToAvoid: [
      "Cold, raw foods and drinks",
      "Dry, crunchy foods (crackers, chips)",
      "Bitter, pungent, and astringent tastes",
      "Most beans except mung beans",
      "Excessive caffeine and stimulants",
      "Frozen vegetables",
      "Leftover food"
    ]
  },
  pitta: {
    general: "Cooling, slightly dry, and substantial foods help pacify Pitta. Favor sweet, bitter, and astringent tastes. Avoid excessive heat and spices.",
    foodsToFavor: [
      "Sweet fruits (melons, grapes, apples, pears, plums)",
      "Cooling vegetables (cucumber, leafy greens, broccoli, cauliflower)",
      "Grains (barley, rice, wheat)",
      "Legumes (chickpeas, lentils, mung beans)",
      "Cooling spices (fennel, coriander, cardamom, mint)",
      "Ghee and coconut oil",
      "Milk and dairy products",
      "Sweeteners like honey (in moderation)"
    ],
    foodsToAvoid: [
      "Hot, spicy foods",
      "Sour foods (citrus, tomatoes, vinegar)",
      "Fermented foods (yogurt, cheese, sour cream)",
      "Red meat and fried foods",
      "Excessive oil and salt",
      "Alcohol, caffeine, and tobacco",
      "Garlic, onions, and excessive heating spices"
    ]
  },
  kapha: {
    general: "Light, warm, and stimulating foods are ideal for Kapha balance. Emphasize pungent, bitter, and astringent tastes. Focus on warming, light, and dry foods.",
    foodsToFavor: [
      "Light, dry fruits (apples, pears, berries, pomegranates)",
      "Leafy greens and most vegetables",
      "Light grains (millet, barley, buckwheat)",
      "Lighter legumes (lentils, mung beans)",
      "Pungent spices (ginger, chili, black pepper, mustard)",
      "Honey (raw and unprocessed)",
      "Warm, light beverages",
      "Bitter greens and herbs"
    ],
    foodsToAvoid: [
      "Heavy, oily, and cold foods",
      "Sweet, sour, and salty tastes",
      "Dairy products (milk, yogurt, cheese)",
      "Excessive wheat, rice, and heavy grains",
      "Cold drinks and ice",
      "Sugary foods and sweeteners",
      "Fried foods and excessive oils"
    ]
  }
};
