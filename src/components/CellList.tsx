import './CellList.css';
import React, { Fragment, memo } from 'react';
import { useTypeSelector } from '../hooks/use-typed-selector';
import AddCell from './AddCell';
import CellListItem from './CellListItem';

export type CellListProps = {};

const CellList: React.FC<CellListProps> = (props) => {
  const cells = useTypeSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id];
    });
  });

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default memo(CellList);
