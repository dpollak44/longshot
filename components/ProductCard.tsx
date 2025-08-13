import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  origin: string;
  price: number;
  notes: string[];
  imageUrl?: string;
  roastLevel: "light" | "medium" | "dark";
}

const coffeeImages: Record<string, string> = {
  "ethiopia-yirgacheffe": "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=400&h=400&fit=crop",
  "colombia-geisha": "https://images.unsplash.com/photo-1559056199-5a47f60c5053?w=400&h=400&fit=crop",
  "kenya-aa": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop",
  "guatemala-antigua": "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=400&h=400&fit=crop",
  "house-blend": "https://images.unsplash.com/photo-1599639932525-a93cf1f96a77?w=400&h=400&fit=crop",
  "breakfast-blend": "https://images.unsplash.com/photo-1542317873-894ffef09132?w=400&h=400&fit=crop",
  "espresso-dark": "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=400&fit=crop",
  "french-roast": "https://images.unsplash.com/photo-1609347744403-fb9600f0ed9a?w=400&h=400&fit=crop",
  "decaf-colombia": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
  "costa-rica-tarrazu": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
  "peru-organic": "https://images.unsplash.com/photo-1514664030710-2e4a8e182e1f?w=400&h=400&fit=crop",
  "espresso-blend": "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=400&h=400&fit=crop",
  "decaf-ethiopia": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=400&fit=crop",
  "decaf-mexico": "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=400&h=400&fit=crop",
};

const ProductCard = ({ id, name, origin, price, notes, imageUrl, roastLevel }: ProductCardProps) => {
  const roastColors = {
    light: "bg-yellow-200",
    medium: "bg-orange-300",
    dark: "bg-amber-800",
  };

  const displayImage = imageUrl || coffeeImages[id];

  return (
    <Link href={`/shop/product/${id}`} className="group">
      <div className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          {displayImage ? (
            <img
              src={displayImage}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-300 mb-2">☕</div>
                <span className="text-gray-400 text-sm">Coffee Bag</span>
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs font-medium ${roastColors[roastLevel]} text-black rounded`}>
              {roastLevel}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{origin}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {notes.map((note, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {note}
              </span>
            ))}
          </div>
          <p className="font-semibold text-lg">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;