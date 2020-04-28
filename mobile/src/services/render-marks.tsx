import React, {useCallback} from 'react';
import {ReactNode, useState, useEffect} from 'react';

import Mark from '~/components/Mark';

import {MarkData} from '../schemas/Mark/index';

export const useRenderMarks = (
  marks: MarkData[],
): [
  ReactNode,
  {
    currentSelection: MarkData | undefined;
    setSelection: (mark: MarkData) => void;
    clearSelection: () => void;
  },
] => {
  const [state, setState] = useState<ReactNode>();
  const [currentSelection, setSelection] = useState<MarkData>();

  const clearSelection = useCallback(() => {
    setSelection(undefined);
  }, []);

  useEffect(() => {
    setState(
      <>
        {marks.map((mark) => (
          <Mark
            key={mark.id}
            icon={mark.mark}
            selected={mark.id === currentSelection?.id}
            saved={mark.saved}
            coordinate={{latitude: mark.lat, longitude: mark.lng}}
            onPress={() => {
              setSelection(mark);
            }}
          />
        ))}
      </>,
    );
  }, [marks, currentSelection]);

  return [state, {currentSelection, setSelection, clearSelection}];
};
