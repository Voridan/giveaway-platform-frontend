import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import testImg from '../../assets/test.jpg';
import { ExpandMore } from '@mui/icons-material';
import ExpandMoreComponent from '../../components/general/ExpandMore';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useReducer,
  useState,
} from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Giveaway } from '../../models/Giveaway';
import Loader from '../../components/general/Loader/Loader';
import { EditGiveaway } from '../../models/EditGiveaway';
import { Partner } from '../../models/Partner';
import InputOnlySearch from '../../components/general/InputOnlySearch/InputOnlySearch';
import PartnerCheckboxGroup from '../../components/Giveaway/PartnersCheckboxGroup';
import usePopup from '../../hooks/usePopup';
import Popup from '../../components/general/Popup';
import { AxiosError } from 'axios';
import useAuth from '../../hooks/useAuth';
import { EntityId } from '../../types';

type EditGiveawayAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string | undefined }
  | { type: 'SET_IMAGEURL'; payload: string | undefined }
  | { type: 'SET_PARTICIPANTS'; payload: string | undefined }
  | { type: 'SET_POSTURL'; payload: string | undefined };

const editGiveawayReducer = (
  state: EditGiveaway,
  action: EditGiveawayAction
): EditGiveaway => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'SET_IMAGEURL':
      return { ...state, imageUrl: action.payload };
    case 'SET_PARTICIPANTS':
      return { ...state, participants: action.payload };
    case 'SET_POSTURL':
      return { ...state, postUrl: action.payload };
    default:
      return state;
  }
};

const EditGiveawayForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const [formData, dispatch] = useReducer(editGiveawayReducer, {});
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const giveaway = location.state?.giveaway as Giveaway;
  const [partnersFound, setPartnersFound] = useState<Partner[] | null>(null);
  const [selectedPartnerIds, setSelectedPartnerIds] = useState<Set<EntityId>>(
    new Set(giveaway.partners?.map((p) => p.id))
  );
  const { popupFields, popupHandlers } = usePopup();

  const partnersCount = selectedPartnerIds.size;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (giveaway) {
      dispatch({ type: 'SET_TITLE', payload: giveaway.title });
      dispatch({ type: 'SET_DESCRIPTION', payload: giveaway.description });
      dispatch({ type: 'SET_IMAGEURL', payload: giveaway.imageUrl });
      dispatch({ type: 'SET_PARTICIPANTS', payload: '' });
      dispatch({ type: 'SET_POSTURL', payload: giveaway.postUrl });
    }
  }, []);

  const handlePartnersChange = (partners: Partner[] | null) => {
    setPartnersFound(partners?.filter((p) => p.id !== auth?.id) || null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: `SET_${name.toUpperCase()}`,
      payload: value,
    } as EditGiveawayAction);
  };

  const validateInput = () => {
    const postUrlRegex = /^https:\/\/www\.instagram\.com\/p\/[\w-]+\/?$/;
    const participantsListRegex = /^\w+(\s\w+)*$/;
    let isValid = true;
    let warningMsg = '';
    const { title, postUrl, participants } = formData;
    if (title === '') {
      isValid = false;
      warningMsg += 'Title is required.\n';
    }
    if (postUrl && !postUrl?.match(postUrlRegex)) {
      isValid = false;
      warningMsg += 'Invalid post Url format.\n';
    }
    if (participants && !participants?.match(participantsListRegex)) {
      isValid = false;
      warningMsg += 'Invalid participants list format.\n';
    }

    return { isValid, warningMsg };
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { isValid, warningMsg } = validateInput();
    if (isValid) {
      try {
        setIsLoading(true);
        const body: EditGiveaway = {};
        if (formData.title !== giveaway.title) body.title = formData.title;

        if (formData.description !== giveaway.description)
          body.description = formData.description;

        if (formData.postUrl && formData.postUrl !== giveaway.postUrl)
          body.postUrl = formData.postUrl;

        if (formData.participants) body.participants = formData.participants;
        console.log(selectedPartnerIds);
        console.log([...selectedPartnerIds.values()]);
        console.log([...selectedPartnerIds.values()].join(' '));

        body.partnersIds = [...selectedPartnerIds.values()].join(' ');
        await axiosPrivate.patch(`/giveaways/${giveaway.id}`, body);

        popupHandlers.setIsError(false);
        popupHandlers.setPopupTitle('Done!');
        popupHandlers.setOpenPopup(true);
        popupHandlers.setPopupContent('Giveaway Updated!');
        popupHandlers.setCallback(() => navigate(-1));
      } catch (error) {
        if (error instanceof AxiosError) {
          const { status } = error;
          popupHandlers.setIsError(true);
          if (status && status >= 500)
            popupHandlers.setPopupTitle('Server error');
          else if (status && status < 500)
            popupHandlers.setPopupTitle('Client error');
          else popupHandlers.setPopupTitle('Unknown error');
          popupHandlers.setOpenPopup(true);
          popupHandlers.setPopupContent(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      popupHandlers.setIsError(true);
      popupHandlers.setPopupTitle('Invalid input(s)');
      popupHandlers.setOpenPopup(true);
      popupHandlers.setPopupContent(warningMsg);
    }
  };
  console.log(giveaway);

  return (
    <Container maxWidth={false} sx={{ margin: '10px 0' }}>
      <Popup
        open={popupFields.openPopup}
        content={popupFields.popupContent}
        title={popupFields.popupTitle}
        isError={popupFields.isError}
        onClose={popupHandlers.closePopup}
      />
      {isLoading && <Loader />}
      {!isLoading && giveaway && (
        <Box
          sx={{
            height: '100%',
            boxShadow: 3,
            padding: 2,
            width: '100%',
            borderRadius: '14px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography mb={2} variant='h4' textAlign={'center'}>
            Edit Giveaway
          </Typography>
          <Grid
            gap={4}
            container
            sx={{ height: 'auto', flex: '1 1 auto', overflow: 'auto' }}
            className='need-scrollbar'
          >
            <Grid item md sx={{ flex: '0 1 60%' }}>
              <img
                src={testImg}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'top',
                }}
              />
            </Grid>
            <Grid item md>
              <TextField
                fullWidth
                sx={{ marginBottom: 2, fontWeight: 'bold', marginTop: 1 }}
                color='primary'
                value={formData.title}
                onChange={handleChange}
                label='title'
                name='title'
              />
              <TextField
                fullWidth
                multiline
                label='description'
                name='description'
                onChange={handleChange}
                value={formData.description}
              />
              <Box
                mt={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={handleExpandClick}
              >
                <Typography variant='body1' fontWeight={600}>
                  {partnersCount}
                  {partnersCount === 1 ? ' partner' : ' partners'}
                </Typography>
                <ExpandMoreComponent
                  expand={expanded}
                  aria-expanded={expanded}
                  aria-label='show more'
                  onClick={handleExpandClick}
                >
                  <ExpandMore />
                </ExpandMoreComponent>
              </Box>
              {!!giveaway.partners?.length && (
                <Collapse
                  in={expanded}
                  timeout='auto'
                  unmountOnExit
                  sx={{ marginBottom: '10px' }}
                >
                  <PartnerCheckboxGroup
                    partners={giveaway.partners}
                    selectedIds={selectedPartnerIds}
                    setSelectedIds={setSelectedPartnerIds}
                  />
                </Collapse>
              )}
              <InputOnlySearch
                label='search partner'
                queryParam='like'
                url='/users/search'
                setSearchResult={handlePartnersChange}
              />
              {partnersFound &&
                (partnersFound.length ? (
                  <PartnerCheckboxGroup
                    partners={partnersFound}
                    selectedIds={selectedPartnerIds}
                    setSelectedIds={setSelectedPartnerIds}
                  />
                ) : (
                  <p>No results</p>
                ))}
              <Divider />
              <Box>
                <Typography mt={2} mb={1} variant='body1' fontWeight={500}>
                  {giveaway.participantsCount +
                    (formData.participants?.length
                      ? formData.participants?.trim().split(' ').length
                      : 0) +
                    ' '}
                  participants
                </Typography>
                <TextField
                  name='participants'
                  fullWidth
                  multiline
                  label='Add participants'
                  value={formData.participants}
                  onChange={handleChange}
                />
              </Box>
              <Grid container mt={2} gap={2}>
                <TextField
                  autoComplete='off'
                  disabled={!!giveaway.postUrl}
                  sx={{ flexGrow: 1 }}
                  value={formData.postUrl}
                  label={'instagram post url'}
                  name='postUrl'
                  variant='outlined'
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Button
            sx={{ mb: 2, mt: 2 }}
            fullWidth
            variant='contained'
            color='primary'
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default EditGiveawayForm;
