import { FC, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import testImg from '../../assets/test.jpg';
import { ExpandMore } from '@mui/icons-material';
import ExpandMoreComponent from '../general/ExpandMore';
import GiveawayStatus from '../Giveaway/GiveawayStatus';
import { Giveaway as GiveawayModel } from '../../models/Giveaway';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export interface GiveawayProps {
  giveaway: GiveawayModel | undefined;
}

const Giveaway: FC<GiveawayProps> = ({ giveaway }) => {
  const [expanded, setExpanded] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCollectCall = async () => {
    try {
      await axiosPrivate.post('/giveaways/collect-participants', {
        giveawayId: giveaway?.id,
        postUrl: giveaway?.postUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {giveaway && (
        <Box
          sx={{
            boxShadow: 3,
            padding: 2,
            width: '100%',
            borderRadius: '14px',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 3,
          }}
        >
          <Grid gap={4} container sx={{ height: 'auto', flex: '1 1 auto' }}>
            <Grid item md sx={{ flex: '0 1 60%' }}>
              <img
                src={testImg}
                style={{
                  width: '100%',
                  // height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'top',
                }}
              />
            </Grid>
            <Grid item md>
              <Typography
                mb={2}
                variant='h3'
                sx={{ fontWeight: 'bold' }}
                color={'#115293'}
              >
                {giveaway.title}
              </Typography>
              <GiveawayStatus
                ended={giveaway.ended}
                expanded={true}
                onModeration={giveaway.onModeration}
              />
              {giveaway.description && (
                <Typography
                  maxHeight={'6.25rem'}
                  overflow={'auto'}
                  className='need-scrollbar'
                  mt={1}
                  fontWeight={500}
                  variant='body1'
                >
                  {giveaway.description}
                </Typography>
              )}
              <Typography mt={2} variant='body1'>
                Created: {new Date(giveaway.createdAt).toLocaleDateString()}
              </Typography>
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
                  {giveaway.partners.length}
                  {giveaway.partners.length === 1 ? ' partner' : ' partners'}
                </Typography>
                <ExpandMoreComponent
                  expand={expanded}
                  aria-expanded={expanded}
                  aria-label='show more'
                >
                  <ExpandMore />
                </ExpandMoreComponent>
              </Box>
              {!!giveaway.partners.length && (
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                  <List
                    sx={{
                      padding: '0 0 16px 0',
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                  >
                    {giveaway.partners.map((p) => (
                      <ListItem
                        key={p.id}
                        alignItems='center'
                        sx={{ padding: '8px 8px 0 8px' }}
                      >
                        <ListItemAvatar sx={{ minWidth: '40px' }}>
                          <Avatar
                            sx={{
                              width: '30px',
                              height: '30px',
                            }}
                            alt={p.email}
                          />
                        </ListItemAvatar>
                        <ListItemText primary={p.email} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
              <Divider />
              <Typography mt={2} variant='body1' fontWeight={500}>
                {giveaway.participantsCount} participants
              </Typography>
              <Grid container mt={2} gap={2}>
                <TextField
                  sx={{ flexGrow: 1 }}
                  value={giveaway.postUrl || 'Instagram post url not speified'}
                  label={'Instagram post url'}
                  variant='outlined'
                />
                <Tooltip
                  disableHoverListener={giveaway.postUrl === null}
                  title='Do it only once before ending the giveaway'
                  placement='top'
                >
                  <Button
                    disabled={giveaway.postUrl === null}
                    variant='outlined'
                    color='info'
                    onClick={handleCollectCall}
                  >
                    Whip up participants
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Giveaway;
