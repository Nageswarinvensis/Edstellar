import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";

export default function BlogHero({ category, title }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-[#284bb3] via-[#3f48c9] to-[#5145e8] px-5 py-20 text-white">
      <Box className="pointer-events-none absolute inset-0">
        <img
            src="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/672af632823a23f66a00034a_Rectangle%2028584.svg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
        />
      </Box>

      <Box className="relative mx-auto max-w-4xl text-center">
        <Box className="mb-6 inline-flex rounded-full bg-white/10 px-3 py-1.5">
          <Text
            as="span"
            className="text-[12px] font-semibold leading-none text-white"
          >
            {category}
          </Text>
        </Box>

            <Text as="h1" className="mb-6 text-white">
            12 Must-have Skills for a Site Reliability Engineer (SRE) in 2026
            </Text>


        <Text
          as="p"
          className="mx-auto mt-6 max-w-3xl text-[16px] font-normal leading-[1.7] text-white/90"
        >
          A comprehensive list of the top in-demand skills in Mauritius,
          evaluated by a business development professional with 34 years of
          success across public and private sectors, specializing in stakeholder
          engagement and cross border cooperation.
        </Text>

        <Box className="mx-auto mt-6 h-px max-w-2xl bg-white/20" />

        <Box className="mx-auto mt-5 flex max-w-2xl items-center justify-center gap-4">
          <Box className="h-12 w-12 overflow-hidden rounded-full bg-white/20">
            <img
              src="https://www.edstellar.com/images/blog/romina-panray.jpg"
              alt="Romina Panray"
              className="h-full w-full object-cover"
            />
          </Box>

          <Box className="text-left">
            <Text
              as="p"
              className="text-[14px] font-medium leading-[1.3] text-white"
            >
              by Romina Panray
            </Text>

            <Text
              as="p"
              className="mt-1 text-[12px] leading-[1.3] text-white/90"
            >
              Updated On Jun 30, 2026
            </Text>
          </Box>
        </Box>

        <Box className="mx-auto mt-5 h-px max-w-2xl bg-white/20" />

        <Text
          as="p"
          className="mt-4 text-[12px] font-normal text-white/90"
        >
          25 mins read
        </Text>
      </Box>
    </section>
  );
}