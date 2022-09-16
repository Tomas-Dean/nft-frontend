import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/thunks';
import CollectionCard from './CollectionCard';
import { ICollection } from 'src/collections.types';
interface IProps {
  collections: ICollection[];
  showLoadMore: boolean;
  shuffle: boolean;
}
//react functional component
const ColumnNewRedux = ({
  collections = [],
  showLoadMore = true,
  shuffle = false
}: IProps) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    const currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  const loadMore = () => {
    dispatch(actions.fetchListedNfts());
  };

  return (
    <div className="row">
      {collections &&
        collections.map((collection, index) => (
          <CollectionCard
            collection={collection}
            key={index}
            onImgLoad={onImgLoad}
            height={height}
            clockTop
          />
        ))}
      {showLoadMore && collections.length <= 20 && (
        <div className="col-lg-12">
          <div className="spacer-single"></div>
          <span onClick={loadMore} className="btn-main lead m-auto">
            Load More
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(ColumnNewRedux);
