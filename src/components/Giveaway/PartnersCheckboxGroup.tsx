import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { Partner } from '../../models/Partner';

interface PartnerCheckboxGroupProps {
  partners: Partner[];
  selectedIds: Set<number>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const PartnerCheckboxGroup: React.FC<PartnerCheckboxGroupProps> = ({
  partners,
  selectedIds,
  setSelectedIds,
}) => {
  const handleCheckboxChange = (partnerId: number) => {
    setSelectedIds((prevSelectedIds) => {
      const newSelectedIds = prevSelectedIds
        ? new Set(prevSelectedIds)
        : new Set<number>();
      if (newSelectedIds.has(partnerId)) {
        newSelectedIds.delete(partnerId);
      } else {
        newSelectedIds.add(partnerId);
      }

      return newSelectedIds;
    });
  };

  return (
    <Container
      maxWidth={false}
      className='need-scrollbar'
      sx={{
        maxHeight: '8rem',
        overflow: 'auto',
      }}
    >
      <FormGroup>
        {partners.map((p) => (
          <FormControlLabel
            key={p.id}
            control={
              <Checkbox
                checked={selectedIds.has(p.id)}
                onChange={() => handleCheckboxChange(p.id)}
              />
            }
            label={`Email: ${p.email}`}
          />
        ))}
      </FormGroup>
    </Container>
  );
};

export default PartnerCheckboxGroup;
