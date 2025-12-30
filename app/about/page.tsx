import { Footer } from '@/components/footer';
import { Header } from '@/components/header-client';
import { Target, Eye, Heart, Award } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const values = [
    {
      icon: <Target size={40} className="text-blue-600" />,
      title: 'Our Mission',
      description: 'To deliver innovative and reliable MAE solutions that exceed client expectations while maintaining the highest standards of quality and safety.',
    },
    {
      icon: <Eye size={40} className="text-blue-600" />,
      title: 'Our Vision',
      description: 'To be the leading MAE services provider in the region, known for excellence, innovation, and sustainable engineering solutions.',
    },
    {
      icon: <Heart size={40} className="text-blue-600" />,
      title: 'Our Values',
      description: 'Integrity, Excellence, Safety, Innovation, and Customer Satisfaction drive everything we do.',
    },
    {
      icon: <Award size={40} className="text-blue-600" />,
      title: 'Quality Commitment',
      description: 'We are committed to HSEQ (Health, Safety, Environment, Quality) standards in all our operations.',
    },
  ];

  return (
    <div>
      <Header/>
      {/* Hero Section */}
{/* Hero Section */}
<section className="relative h-[450px] w-full text-white">
  {/* Background Image */}
  <Image
    src="https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
    alt="Modern building"
    fill
    priority
    className="object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/80" />

  {/* Content */}
  <div className="relative z-10 h-full flex items-center justify-center">
    <div className="text-center px-4 max-w-4xl">
      <h1 className="text-5xl mb-4">About CAR1PRO</h1>
      <p className="text-xl">Engineering Excellence Since Day One</p>
    </div>
  </div>
</section>


      {/* Company Overview */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h2 className="text-4xl mb-6">Who We Are</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              CAR1PRO is a premier provider of Mechanical, Electrical, and Plumbing (MAE) services,
              dedicated to delivering innovative engineering solutions. Our team of experienced
              professionals combines technical expertise with a commitment to quality, safety, and
              customer satisfaction. We specialize in comprehensive MAE services for commercial,
              residential, and industrial projects.
            </p>
          </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
  {/* LEFT IMAGE */}
  <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
    <Image
      src="https://images.unsplash.com/photo-1664902578190-ec984429fabc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
      alt="Our team"
      fill
      className="object-cover"
    />
  </div>

  {/* RIGHT CONTENT */}
  <div className="flex flex-col justify-center h-[400px]">
    <h3 className="text-3xl mb-6">Our Story</h3>
    <p className="text-gray-600 mb-4">
      Founded with a vision to transform the MAE services industry, CAR1PRO has grown to
      become a trusted partner for businesses and organizations across the region.
    </p>
    <p className="text-gray-600 mb-4">
      Our success is built on a foundation of technical excellence, innovative solutions,
      and unwavering commitment to our clients&apos; success.
    </p>
    <p className="text-gray-600">
      We invest in the latest technologies, continuous training, and best practices to
      ensure we deliver solutions that exceed industry standards.
    </p>
  </div>
</div>


        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HSEQ Commitment */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl mb-6">HSEQ Commitment</h2>
            <p className="text-gray-600 text-lg mb-8">
              At CAR1PRO, Health, Safety, Environment, and Quality (HSEQ) are not just
              compliance requirements—they are fundamental to who we are and how we operate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl mb-3">Safety First</h3>
                <p className="text-gray-600">
                  We maintain rigorous safety protocols and provide comprehensive training to
                  ensure the well-being of our team and clients.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl mb-3">Quality Assurance</h3>
                <p className="text-gray-600">
                  Our quality management systems ensure every project meets the highest
                  standards of excellence.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl mb-3">Environmental Responsibility</h3>
                <p className="text-gray-600">
                  We are committed to sustainable practices and minimizing our environmental
                  impact.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl mb-3">Continuous Improvement</h3>
                <p className="text-gray-600">
                  We regularly review and improve our processes to maintain excellence in all
                  areas of operation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
