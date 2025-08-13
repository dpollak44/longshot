import { Clock, Droplets, Thermometer, Coffee } from "lucide-react";

const brewMethods = [
  {
    id: "pour-over",
    name: "Pour Over (V60/Chemex)",
    time: "3-4 minutes",
    ratio: "1:15",
    grind: "Medium-Fine",
    temp: "195-205°F",
    description: "A clean, bright cup with clarity of flavor",
    steps: [
      "Rinse filter with hot water",
      "Add coffee grounds (22g for 330ml water)",
      "Bloom with 50ml water for 30 seconds",
      "Pour water in slow circles to 330ml",
      "Total brew time: 2:30-3:00",
    ],
  },
  {
    id: "french-press",
    name: "French Press",
    time: "4 minutes",
    ratio: "1:12",
    grind: "Coarse",
    temp: "195-205°F",
    description: "Full-bodied coffee with rich texture",
    steps: [
      "Add coarse ground coffee",
      "Pour hot water over grounds",
      "Stir and place lid on top",
      "Steep for 4 minutes",
      "Press plunger down slowly",
    ],
  },
  {
    id: "espresso",
    name: "Espresso",
    time: "25-30 seconds",
    ratio: "1:2",
    grind: "Fine",
    temp: "190-196°F",
    description: "Concentrated, intense coffee with crema",
    steps: [
      "Dose 18-20g of fine ground coffee",
      "Distribute and tamp evenly",
      "Lock portafilter into machine",
      "Extract 36-40g in 25-30 seconds",
      "Adjust grind for proper extraction time",
    ],
  },
  {
    id: "aeropress",
    name: "AeroPress",
    time: "1-2 minutes",
    ratio: "1:12",
    grind: "Medium-Fine",
    temp: "175-185°F",
    description: "Smooth, clean cup with low acidity",
    steps: [
      "Insert filter and rinse",
      "Add 17g coffee to inverted AeroPress",
      "Pour 220ml water and stir",
      "Steep for 1 minute",
      "Flip and press for 30 seconds",
    ],
  },
];

export default function BrewGuidesPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Brew Guides</h1>
        <p className="text-gray-600 mb-8">
          Master the art of coffee brewing with our detailed guides. Each method brings out 
          different characteristics in your coffee.
        </p>

        <div className="space-y-8">
          {brewMethods.map((method) => (
            <div key={method.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{method.name}</h2>
              <p className="text-gray-600 mb-4">{method.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-medium">{method.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Coffee size={20} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Ratio</p>
                    <p className="font-medium">{method.ratio}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Droplets size={20} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Grind</p>
                    <p className="font-medium">{method.grind}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Thermometer size={20} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Temperature</p>
                    <p className="font-medium">{method.temp}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Step-by-Step Instructions</h3>
                <ol className="space-y-2">
                  {method.steps.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Pro Tips</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Always use freshly roasted coffee (within 2-4 weeks of roast date)</li>
            <li>• Grind your coffee just before brewing for maximum freshness</li>
            <li>• Use filtered water for the best taste</li>
            <li>• Maintain consistent water temperature throughout brewing</li>
            <li>• Keep your equipment clean for optimal flavor</li>
          </ul>
        </div>
      </div>
    </div>
  );
}