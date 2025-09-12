// Home.jsx
import PicGallery from '../components/PicGallery';
import ProductList from '../components/ProductList';
import SizesTable from '../components/SizesTable';
import Title from '../components/Title';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation("global");

  return (
    <div className="container mx-auto sm:px-6 mt-2">
      <div className="flex flex-col gap-4 sm:gap-20">
        {/* <StatsHeader /> */}
        <Title title={t("home.featured_products")} />
        <ProductList />
        <Title title={t("home.table_sizes")} />
        <SizesTable />
        {/* <Title title={"Gallery Pics"} /> */}
        {/* <PicGallery /> */}
      </div>
    </div>
  );
};

export default Home;
