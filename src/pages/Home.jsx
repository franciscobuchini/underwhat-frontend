// Home.jsx
import ProductList from '../components/ProductList';
import SizesTable from '../components/SizesTable';
import { useTranslation } from 'react-i18next';
import { Icon } from "@iconify/react";

const Home = () => {
  const { t } = useTranslation("global");


  return (
    <div className="container mx-auto px-6 flex flex-col items-center gap-12">
      <div className="flex flex-col gap-4 sm:gap-10">
        <ProductList />
            <h1 className="text-3xl font-bold text-gray-600 flex items-center gap-4">
            <Icon icon="icon-park-twotone:ruler-one" className="w-10 h-10 flex-shrink-0 text-pink-800" />
            {t("home.table_sizes")}
        </h1>
        <SizesTable />
        {/* <PicGallery /> */}
      </div>
    </div>
  );
};

export default Home;
