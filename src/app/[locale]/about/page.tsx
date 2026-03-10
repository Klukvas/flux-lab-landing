import { getTranslations } from 'next-intl/server';
import { Container, SectionHeading, Card, AnimatedSection } from '@/components/ui';
import { TeamCard } from '@/components/about/team-card';
import { teamMembers, timelineEvents } from '@/data/team';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return generatePageMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/about',
    locale,
  });
}

export default async function AboutPage() {
  const t = await getTranslations('about');

  const values = [
    { title: t('values.quality'), description: t('values.qualityDesc'), num: '01' },
    { title: t('values.innovation'), description: t('values.innovationDesc'), num: '02' },
    { title: t('values.transparency'), description: t('values.transparencyDesc'), num: '03' },
    { title: t('values.growth'), description: t('values.growthDesc'), num: '04' },
  ];

  return (
    <>
      <section className="py-24">
        <Container>
          <SectionHeading title={t('title')} subtitle={t('subtitle')} />
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-foreground">
              {t('mission.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {t('mission.description')}
            </p>
          </div>
        </Container>
      </section>

      <AnimatedSection className="py-24">
        <Container>
          <SectionHeading title={t('values.title')} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <span className="text-2xl font-bold text-foreground">{value.num}</span>
                <h3 className="mt-3 font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <section className="py-24">
        <Container>
          <SectionHeading title={t('team.title')} subtitle={t('team.subtitle')} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </Container>
      </section>

      <AnimatedSection className="py-24">
        <Container>
          <SectionHeading title={t('timeline.title')} />
          <div className="mx-auto max-w-2xl">
            <div className="relative border-l-2 border-gray-200 pl-8 dark:border-gray-800">
              {timelineEvents.map((event) => (
                <div key={event.year} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                    {/* dot */}
                  </div>
                  <div className="text-sm font-bold text-foreground">
                    {event.year}
                  </div>
                  <h3 className="mt-1 font-semibold text-foreground">
                    {t(event.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {t(event.descriptionKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </AnimatedSection>
    </>
  );
}
