import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { Partner } from '../../models/Partner';
import { EntityId } from '../../types';

interface PartnerCheckboxGroupProps {
  partners: Partner[];
  selectedIds: Set<EntityId>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<EntityId>>>;
}

const PartnerCheckboxGroup: React.FC<PartnerCheckboxGroupProps> = ({
  partners,
  selectedIds,
  setSelectedIds,
}) => {
  const handleCheckboxChange = (partnerId: EntityId) => {
    setSelectedIds((prevSelectedIds) => {
      const newSelectedIds = prevSelectedIds
        ? new Set(prevSelectedIds)
        : new Set<EntityId>();
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
