import { FormEvent, useState } from 'react';
import {
  TextField,
  Button,
  TextareaAutosize,
  Typography,
  Grid,
  Container,
} from '@mui/material';
import InputOnlySearch from '../general/InputOnlySearch/InputOnlySearch';
import PartnerCheckboxGroup from './PartnersCheckboxGroup';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Popup from '../general/Popup';
import usePopup from '../../hooks/usePopup';
import { AxiosError } from 'axios';
import { Partner } from '../../models/Partner';
import { EntityId } from '../../types';

interface CreateGiveawayDto {
  title: string;
  description?: string;
  participants?: string;
  postUrl?: string;
  partnersIds?: string;
}

const CreateGiveawayForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [partners, setPartners] = useState<Partner[] | null>(null);
  const [participantsOrUrl, setParticipantsOrUrl] = useState('');
  const [selectedPartnerIds, setSelectedPartnerIds] = useState<Set<EntityId>>(
    new Set()
  );
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { popupFields, popupHandlers } = usePopup();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postUrlRegex = /^https:\/\/www\.instagram\.com\/p\/[\w-]+\/?$/;
    const participantsListRegex = /^\w+(\s\w+)*$/;

    const createGiveawayBody: CreateGiveawayDto = {
      title,
    };

    if (description.trim().length) createGiveawayBody.description = description;
    if (participantsOrUrl.trim().length) {
      if (participantsOrUrl.match(postUrlRegex)) {
        createGiveawayBody.postUrl = participantsOrUrl;
      } else if (participantsOrUrl.match(participantsListRegex)) {
        createGiveawayBody.participants = participantsOrUrl;
      } else {
        popupHandlers.setOpenPopup(true);
        popupHandlers.setIsError(true);
        popupHandlers.setPopupTitle('Incorrect input data');
        popupHandlers.setPopupContent(
          <Typography variant='h6'>
            incorrect format of post url or participants list
          </Typography>
        );
      }
    }
    if (selectedPartnerIds.size > 0) {
      createGiveawayBody.partnersIds = [...selectedPartnerIds.values()].join(
        ' '
      );
    }
    try {
      const response = await axiosPrivate.post(
        '/giveaways',
        createGiveawayBody
      );

      if (response.status === 201) {
        popupHandlers.setOpenPopup(true);
        popupHandlers.setIsError(false);
        popupHandlers.setPopupTitle('Success');
        popupHandlers.setPopupContent(
          <Typography variant='h6'>
            Created: {JSON.stringify(response.data)}
          </Typography>
        );
        popupHandlers.setCallback(() => navigate(-1));
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        popupHandlers.setOpenPopup(true);
        popupHandlers.setIsError(true);
        popupHandlers.setPopupTitle(
          e.status! >= 500 ? 'Server error' : 'Client error'
        );
        popupHandlers.setPopupContent(
          <Typography variant='h6'>Failed to create giveaway</Typography>
        );
      }
    }
  };

  return (
    <Container
      sx={{
        margin: '20px auto',
      }}
    >
      <Popup
        title={popupFields.popupTitle}
        content={popupFields.popupContent}
        isError={popupFields.isError}
        open={popupFields.openPopup}
        onClose={popupHandlers.closePopup}
      />
      <Typography variant='h4' gutterBottom>
        Create Giveaway
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label='Title'
              variant='outlined'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              fontFamily: '"Roboto", "Helvetica"',
            }}
          >
            <div
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#000000de';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#ccc';
              }}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '16.5px 14px',
              }}
            >
              <TextareaAutosize
                maxRows={3}
                placeholder='Description'
                className='need-scrollbar'
                style={{
                  width: '100%',
                  fontFamily: 'inherit',
                  resize: 'none',
                  fontSize: '1rem',
                }}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <InputOnlySearch
              label='search partner'
              url='/users/search'
              queryParam='like'
              setSearchResult={(partners: Partner[]) => setPartners(partners)}
            />
            {partners &&
              (partners?.length ? (
                <PartnerCheckboxGroup
                  partners={partners}
                  selectedIds={selectedPartnerIds}
                  setSelectedIds={setSelectedPartnerIds}
                />
              ) : (
                <p
                  style={{
                    paddingTop: '5px',
                    fontFamily: 'Roboto',
                    fontSize: '0.88rem',
                    color: '#2b8a3f',
                  }}
                >
                  No results
                </p>
              ))}
          </Grid>
          <Grid item xs={12} style={{ fontFamily: '"Roboto", "Helvetica"' }}>
            <div
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#000000de';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#ccc';
              }}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '16.5px 14px',
              }}
            >
              <TextareaAutosize
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000000de';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#ccc';
                }}
                maxRows={3}
                placeholder='Add Participants (space separated nicknames) OR add post url'
                className='need-scrollbar'
                style={{
                  width: '100%',
                  borderColor: '#ccc',
                  fontFamily: 'inherit',
                  resize: 'none',
                  fontSize: '1rem',
                }}
                value={participantsOrUrl}
                onChange={(e) => {
                  setParticipantsOrUrl(e.target.value);
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='outlined' color='primary' fullWidth>
              Create Giveaway
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateGiveawayForm;
