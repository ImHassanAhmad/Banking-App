import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { type FC } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import type { ISocialLinkProps } from './types';
import { useTheme } from '@mui/material/styles';
import Accordian from './Accordian';

const SocialLink: FC<ISocialLinkProps> = ({ Icon }) => {
  const theme = useTheme();

  return (
    <Icon
      sx={{
        background: '#F0F0F0',
        height: '2  0px',
        width: '2 0px',
        padding: '10px',
        borderRadius: '50%',
        transition: 'background-color 0.3s',
        cursor: 'pointer',
        color: '#484848',
        '&:hover': {
          background: theme.palette.primary.main
        }
      }}
    />
  );
};

const AssetDetails: FC = () => {
  const theme = useTheme();

  return (
    <Box m="40px">
      <Typography variant="h4">Asset Details</Typography>
      <Box m="40px 0" display="flex" gap="40px" height="400px">
        <Box
          component="img"
          sx={{
            borderRadius: '20px',
            width: '400px',
            objectFit: 'cover'
          }}
          alt="The house from the offer."
          src="https://1000logos.net/wp-content/uploads/2023/01/Ethereum-logo.png"
        />
        <Box p="20px 0">
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontSize="22px" fontWeight="bold" color="grey" mb="30px">
              Overview
            </Typography>
            <EditIcon
              sx={{
                background: '#F0F0F0',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                padding: '5px',
                transition: 'background-color 0.3s',
                cursor: 'pointer',
                position: 'relative',
                bottom: '5px',
                color: '#484848',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main
                }
              }}
            />
          </Box>

          <Box display="flex" gap="25px">
            <Box display="flex" gap="10px">
              <Box>
                {['Asset Id', 'Asset Name', 'Symbol', 'Submission Date'].map((text) => (
                  <Typography
                    key={text}
                    fontWeight="bold"
                    mb="20px"
                    height="38px"
                    alignItems="center"
                    display="flex">
                    {text}:
                  </Typography>
                ))}
              </Box>
              <Box>
                {['345422', 'Dummy Asset', 'DA', 'Mar 32, 2023'].map((text) => (
                  <Typography key={text} mb="20px" height="38px" alignItems="center" display="flex">
                    {text}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box display="flex" gap="10px">
              <Box>
                {['Status', 'Price', 'Type', 'Issuance Date'].map((text) => (
                  <Typography
                    key={text}
                    fontWeight="bold"
                    mb="20px"
                    height="38px"
                    alignItems="center"
                    display="flex">
                    {text}:
                  </Typography>
                ))}
              </Box>
              <Box>
                {['Pending for Approval', 'USD 0.23', 'ABC', 'Mar 32, 2023'].map((text, index) => (
                  <Typography
                    key={text}
                    mb="20px"
                    height="38px"
                    alignItems="center"
                    display="flex"
                    sx={
                      index === 0
                        ? {
                            padding: '0 15px',
                            background: theme.palette.primary.main,
                            borderRadius: '10px'
                          }
                        : {}
                    }>
                    {text}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
          <Stack direction="row" gap="20px" mt="20px">
            {[
              { Icon: InstagramIcon },
              { Icon: TwitterIcon },
              { Icon: FacebookIcon },
              { Icon: YouTubeIcon },
              { Icon: LanguageIcon }
            ].map(({ Icon }, index) => (
              <SocialLink Icon={Icon} key={index} />
            ))}
          </Stack>
        </Box>
      </Box>
      <Accordian
        header="Description"
        content={
          <Typography>
            There are many variations of passages of Lorem Ipsum available, but the majority have
            There are many variations of passages of Lorem Ipsum available, but the majority have
            There are many variations of passages of Lorem Ipsum available, but the majority have
            There are many variations of passages of Lorem Ipsum available, but the majority have
            There are many variations of passages of Lorem Ipsum available, but the majority have
            There are many variations of passages of Lorem Ipsum available, but the majority have
            There are many variations of passages of Lorem Ipsum available, but the majority have
            There are many variations of passages of Lorem Ipsum available, but the majority have
          </Typography>
        }
      />

      <Box display="flex" gap="30px">
        <Box flex="1">
          <Accordian
            header="Token Information"
            content={
              <Box display="flex" gap="30px">
                <Box>
                  {['Name', 'Symbol', 'Contact Address', 'Token Status', 'Last Updated at'].map(
                    (text) => (
                      <Typography
                        key={text}
                        fontWeight="bold"
                        mb="20px"
                        height="38px"
                        alignItems="center"
                        display="flex">
                        {text}:
                      </Typography>
                    )
                  )}
                </Box>
                <Box>
                  {['ABC Token', 'ABC', '0x32...456353655', 'Deployed', 'Mar 23, 2023'].map(
                    (text) => (
                      <Typography
                        key={text}
                        mb="20px"
                        height="38px"
                        alignItems="center"
                        display="flex">
                        {text}
                      </Typography>
                    )
                  )}
                </Box>
              </Box>
            }
          />
        </Box>
        <Box flex="1">
          <Accordian
            header="Token Stats"
            content={
              <Box display="flex" gap="30px">
                <Box>
                  {[
                    'Total Supply',
                    'Minted Supply',
                    'Number of Holders',
                    'Daily Purchases(Base Currency)',
                    'Total Purchases(Base Currency)'
                  ].map((text) => (
                    <Typography
                      key={text}
                      fontWeight="bold"
                      mb="20px"
                      height="38px"
                      alignItems="center"
                      display="flex">
                      {text}:
                    </Typography>
                  ))}
                </Box>
                <Box>
                  {[
                    '2138984328936498132',
                    '2138984328936498132',
                    '2138984328936498132',
                    '1234343',
                    '12343354545'
                  ].map((text) => (
                    <Typography
                      key={text}
                      mb="20px"
                      height="38px"
                      alignItems="center"
                      display="flex">
                      {text}
                    </Typography>
                  ))}
                </Box>
              </Box>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AssetDetails;
