// FAQ.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SizesTable from '../components/SizesTable';
import { Icon } from "@iconify/react";

const FAQ = () => {
  const { t } = useTranslation("global");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      id: "faq-01",
      questionKey: "sizes",
      answerComponent: <SizesTable />,
      icon: "icon-park-twotone:ruler-one"
    },
    {
      id: "faq-02",
      questionKey: "taxes",
      answerKey: "taxes",
      icon: "icon-park-twotone:bill"
    },
    {
      id: "faq-03",
      questionKey: "shipping",
      answerKey: "shipping",
      icon: "icon-park-twotone:airplane"
    },
    {
      id: "faq-04",
      questionKey: "custom",
      answerKey: "custom",
      icon: "icon-park-twotone:basketball-clothes"
    },
    {
      id: "faq-05",
      questionKey: "returns",
      answerKey: "returns",
      icon: "icon-park-twotone:back"
    },
    {
      id: "faq-06",
      questionKey: "origin",
      answerKey: "origin",
      icon: "icon-park-twotone:local-two"
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12 mt-20 flex flex-col items-center gap-12">
      <h1 className="text-3xl font-bold mb-10 text-gray-600 flex items-center gap-4">
        <Icon icon="icon-park-twotone:file-question" className="w-10 h-10 flex-shrink-0 text-pink-800" />
        {t("faq.title")}
      </h1>
      
      <div className="divide-y divide-gray-300">
        {faqItems.map((item, index) => (
          <div key={item.id} className={`${index === faqItems.length - 1 ? '' : 'border-b'}`}>
            <button
              className="w-full flex items-center justify-between py-6 text-gray-600 hover:text-pink-800 focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span className="flex items-center text-left gap-4">
                <Icon icon={item.icon} className="text-pink-800 w-6 h-6 flex-shrink-0" />
                {t(`faq.questions.${item.questionKey}`)}
              </span>
              <Icon
                icon="mingcute:down-line" 
                className={`w-6 h-6 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`transition-all overflow-hidden ${openIndex === index ? ' opacity-100 py-2' : 'max-h-0 opacity-0'}`}>
              <div className="px-0 sm:px-6 pb-4 text-gray-400">
                {item.answerComponent || <p>{t(`faq.answers.${item.answerKey}`)}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
