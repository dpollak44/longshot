export default function StoryPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Our Story</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-6">
            Longshot Coffee Company began in 2015 with a simple belief: exceptional coffee 
            should be accessible to everyone. What started as weekend trips to local farmers&apos; 
            markets has grown into a thriving roastery serving coffee lovers nationwide.
          </p>

          <h2 className="text-2xl font-bold mb-4">The Beginning</h2>
          <p className="mb-6">
            Our founder, Sarah Chen, discovered her passion for coffee while traveling through 
            Ethiopia in 2014. Experiencing coffee ceremonies in the birthplace of arabica changed 
            her perspective on what coffee could be – not just a morning ritual, but a connection 
            to communities, cultures, and craftsmanship spanning continents.
          </p>
          
          <p className="mb-6">
            Upon returning home to Portland, Sarah began roasting small batches in her garage, 
            experimenting with different origins and roast profiles. Friends and family couldn&apos;t 
            get enough, and soon word spread about the exceptional coffee coming from that small 
            garage roaster.
          </p>

          <h2 className="text-2xl font-bold mb-4">Growing Our Mission</h2>
          <p className="mb-6">
            In 2016, we opened our first roastery and cafe in Southeast Portland. Our commitment 
            to direct trade relationships meant traveling to origin, meeting farmers face-to-face, 
            and ensuring fair prices that support sustainable farming practices.
          </p>
          
          <p className="mb-6">
            Today, we work with over 20 partner farms across 12 countries. Each relationship is 
            built on mutual respect, transparency, and a shared commitment to quality. We pay 
            premium prices – often 2-3 times commodity rates – because we believe great coffee 
            starts with thriving farming communities.
          </p>

          <h2 className="text-2xl font-bold mb-4">Our Roasting Philosophy</h2>
          <p className="mb-6">
            We approach roasting as both art and science. Each coffee is roasted to highlight 
            its unique characteristics – whether that&apos;s the bright acidity of a Kenyan, the 
            chocolate notes of a Colombian, or the complex fruit flavors of a natural Ethiopian.
          </p>
          
          <p className="mb-6">
            Our roasting team, led by Head Roaster Marcus Johnson, cups every batch to ensure 
            consistency and quality. We roast Monday through Friday, shipping orders the same 
            day they&apos;re roasted to guarantee maximum freshness.
          </p>

          <h2 className="text-2xl font-bold mb-4">Looking Forward</h2>
          <p className="mb-6">
            As we grow, our core values remain unchanged: exceptional quality, sustainable 
            sourcing, and genuine connections. We&apos;re investing in renewable energy for our 
            roastery, expanding our farmer partnership programs, and exploring innovative 
            processing methods that push the boundaries of flavor.
          </p>
          
          <p className="mb-6">
            Coffee is more than a beverage – it&apos;s a global community. Every cup tells a 
            story of the people and places that made it possible. We&apos;re honored to be part 
            of your coffee journey and excited to share these stories with you.
          </p>

          <div className="bg-black text-white p-8 rounded-lg mt-8">
            <h3 className="text-xl font-bold mb-4">Join Our Journey</h3>
            <p className="mb-4">
              Follow along as we explore new origins, share brewing tips, and celebrate the 
              farmers who make great coffee possible.
            </p>
            <button className="bg-white text-black px-6 py-2 font-medium hover:bg-gray-100 transition-colors">
              Subscribe to Our Newsletter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}