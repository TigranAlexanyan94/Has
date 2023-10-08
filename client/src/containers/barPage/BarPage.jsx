import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import UpDownSlider from '../../components/sliders/upDownSlider/UpDownSlider';
import PrevNextSlider from '../../components/sliders/prevNextSlider/PrevNextSlider';
import BackBtn from '../../components/buttons/backButton/BackButton';
import LanguageBtn from '../../components/buttons/languageButton/LanguageButton';
import './BarPage.css';
import { getCategories } from '../../reducers/categoriesSlice';
import { getProductsById } from '../../reducers/productsSlice';
import categoriesData from '../../selectors/categorySelector';
import productsData from '../../selectors/productSelector';
import { BAR } from '../../constants/constant';

const BarPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const dispatch = useDispatch();
  const categoriesNames = useSelector(categoriesData);
  const products = useSelector(productsData);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductsById(selectedCategoryId));
  }, [selectedCategoryId]);

  if (!products) {
    return null;
  }

  return (
    <div className="bar-page ">
      <div className="main">
        <Header title={BAR} />
        {products.length > 0 && <PrevNextSlider items={products} />}
        <div className="footer">
          <Link to="/">
            <BackBtn />
          </Link>
          <UpDownSlider
            items={categoriesNames}
            onChangeSlide={setSelectedCategoryId}
          />
          <LanguageBtn />
        </div>
      </div>
    </div>
  );
};

export default BarPage;
