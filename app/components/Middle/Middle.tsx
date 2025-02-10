import Link from "next/link";

const TrainTheTrainerBanner = () => {
  const data = {
    bannerSection: {
      title:
        "We're looking to continue meeting experienced and talented individuals with proven experience with both technology and instructional acumen.",
      offer:
        "We offer numerous Train-the-Trainer (T3) certification paths to expand your training capabilities in various technology areas.",
      action:
        "If you are interested in becoming a member of our Trainer Network, please complete our sign-up form, and we will reach out to you to schedule an initial call",
      cta: "SIGN UP TODAY",
    },
  };

  const { title, offer, action, cta } = data.bannerSection;

  return (
    <div className="w-full bg-[#FFEBC9]">
      <div className="w-full py-12 px-4">
        <div className="max-w-12xl mx-auto text-left px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-blue-700 mb-4">{offer}</p>
          <p className="text-base sm:text-lg text-blue-700 mb-6">{action}</p>

          {/* Updated Link component */}
          <Link href="/signupform" passHref>
            <button className="bg-[#4CAF50] text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors">
              {cta}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainTheTrainerBanner;
