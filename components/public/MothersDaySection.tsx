import Link from "next/link";

export default function MothersDaySection() {
  return (
    <section className="bg-[#44312b]">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6 py-10 lg:py-20 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">

        {/* Image */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 flex justify-center">
          <img
            src="/images/promo-mothers-day.jpg"
            alt="Happy Mother's Day – Bon cadeau Taraya Institut"
            className="w-full max-w-[340px] lg:max-w-[380px] rounded-xl shadow-lg object-contain"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <div className="flex flex-col gap-3">
            <p className="font-body text-[#e8c99a] text-[13px] lg:text-[14px] uppercase tracking-[0.12em] font-medium">
              Fête des Mères
            </p>
            <h2 className="font-heading text-[#fbf8ef] text-[34px] lg:text-[48px] font-bold leading-[1.2]">
              Pensez au bon cadeau chez Taraya Institut
            </h2>
          </div>
          <p className="font-body text-[#d4bfa8] text-[16px] lg:text-[20px] leading-[1.5]">
            Offrez à votre maman un moment de bien-être qu&apos;elle n&apos;oubliera pas. Soins visage, massages, pédicure médicale… choisissez le soin qui lui ressemble.
          </p>
          <div>
            <Link
              href="/cadeaux"
              className="inline-flex bg-[#fbf8ef] text-[#44312b] font-heading font-bold text-[16px] leading-[1.3] px-6 py-3 rounded-[64px] whitespace-nowrap hover:bg-white transition-colors"
            >
              Découvrir nos bons cadeaux
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
