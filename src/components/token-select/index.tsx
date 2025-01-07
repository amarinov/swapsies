import React, { useMemo } from 'react';
import { useTokens } from '../../hooks/use-tokens';
import { useChains } from '../../hooks/use-chains';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import ListSubheader from '@mui/material/ListSubheader';
import { Chain, Token } from '../../types/entities';

const DEFAULT_SELECT_LABEL = 'Select chain and token';

const GroupHeader = styled(ListSubheader)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '4px 10px',
  backgroundColor: '#80808057',
});

const GroupItems = styled('ul')({
  padding: 0,
});

const OptionItem = styled('li')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '4px 10px',
});

type ListboxComponentProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  role: string;
};

const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  ListboxComponentProps
>(function ListboxComponent(props, ref) {
  const { children: groupListItems, ...other } = props;
  const itemData = useMemo(() => (groupListItems as React.ReactElement<React.PropsWithChildren>[]).flatMap<React.ReactElement<{ isGroupHeader?: boolean }>>(
    (groupListItem) => {
      const [groupHeader, groupItems] = React.Children.toArray(groupListItem.props.children);
      const optionItems = (groupItems as React.ReactElement<React.PropsWithChildren>).props.children as React.ReactElement[];

      return [
        React.cloneElement(groupHeader as React.ReactElement, { isGroupHeader: true }),
        ...optionItems
      ];
    }), [groupListItems]);

  const getItemHeight = (item: typeof itemData[0]) => item.props.isGroupHeader ? 36 : 48;

  const itemCount = itemData.length;
  const itemSize = 48;
  const listHeight = itemSize * itemCount;

  return (
    <div ref={ref}>
      <div {...other}>
        <VariableSizeList
          itemData={itemData}
          height={Math.min(listHeight, 250)}
          width={300}
          itemSize={(itemIndex) => getItemHeight(itemData[itemIndex])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {({ index, style, data }: ListChildComponentProps) => {
            const dataSet = data[index];
            const inlineStyle = {
              ...style,
              boxSizing: 'border-box',
            }

            return React.cloneElement(dataSet, { key: index, style: inlineStyle });
          }}
        </VariableSizeList>
      </div>
    </div>
  );
});

export type TokenSelectProps = {
  label?: string;
  onChange?: (chain: Chain | null, token: Token | null) => void;
}

export function TokenSelect({ onChange, label = DEFAULT_SELECT_LABEL }: TokenSelectProps) {
  const { chains, isLoading: isLoadingChains } = useChains();
  const { tokens, isLoading: isLoadingTokens } = useTokens();

  const transformedTokens = useMemo(() => {
    if (!tokens) return [];

    return Object.values(tokens).flat();
  }, [tokens]);

  return (
    <Autocomplete
      onChange={(_, tokenValue) => {
        const chainValue = tokenValue ? chains![tokenValue.chainId] : null;
        onChange?.(chainValue, tokenValue)
      }}
      disableListWrap
      loading={isLoadingTokens || isLoadingChains}
      options={transformedTokens}
      groupBy={(option) => option.chainId.toString()}
      getOptionKey={(option) => `${option.chainId}_${option.address}`}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={({ key, ...otherProps }, option) => (
        <OptionItem key={key} {...otherProps}>
          <Avatar alt={option.name} src={option.logoURI} sx={{ width: 32, height: 32 }} />
          {option.name}
        </OptionItem>
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>
            <Avatar alt={chains![params.group].name} src={chains![params.group].logoURI} sx={{ width: 24, height: 24 }} />
            {chains![params.group].name}
          </GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      slotProps={{
        listbox: {
          component: ListboxComponent,
        },
      }}
    />
  );
}