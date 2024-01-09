import { Button, Typography } from '@mui/material';
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
import Accordian from './components/Accordian';
import Heading from '@app/components/Heading';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import BackButton from '@app/components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonWithIcon from '@app/components/ButtonWithIcon';
import { ADD_ICON } from '@app/assets/images';
import InvestorHoldings from './components/InvestorHolding';
import type { InvestorHoldingDto } from './components/InvestorHolding/types';
import AgentListing from './components/AgentListing';

const holdingColumns = [
  { id: 'holder_id', title: 'Holder ID' },
  { id: 'holder_name', title: 'Holder Name' },
  { id: 'holder_address', title: 'Holder Address' },
  { id: 'holder_amount', title: 'Holder Amount' },
  { id: 'holder_holdings', title: 'Holder Holdings' },
  { id: 'transfered', title: 'Transferred On' }
];
const dummyHoldings: InvestorHoldingDto[] = [
  {
    holder_id: '1',
    holder_name: 'John Doe',
    holder_address: '123 Main St',
    holder_amount: '5000',
    holder_holdings: 'ABC Company',
    transfered: '2022-03-15'
  },
  {
    holder_id: '2',
    holder_name: 'Jane Smith',
    holder_address: '456 Oak Ave',
    holder_amount: '8000',
    holder_holdings: 'XYZ Corporation',
    transfered: '2022-04-20'
  }
];

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

const translationNamespace = RouteNames.ASSET_DETAILS;

const AssetDetails: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { assetId } = useParams();

  return (
    <Box mt={4}>
      <Stack>
        <Heading
          title={t(`${translationNamespace}.title`)}
          subTitle={t(`${translationNamespace}.subtitle`)}
        />
      </Stack>
      <Box
        sx={{
          display: 'flex',
          margin: '20px 0',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <BackButton
          onClick={() => {
            navigate(`/${RouteNames.MANAGE_ASSETS}`);
          }}
        />
        <ButtonWithIcon
          sx={{ width: '20%', minWidth: '186px' }}
          title={t(`${translationNamespace}.create_token`)}
          icon={ADD_ICON}
          handleClick={() => {
            navigate(`/${RouteNames.MANAGE_ASSETS}/${RouteNames.CREATE_ASSET_TOKEN}/${assetId}`);
          }}
        />
      </Box>
      <Box m="40px 0" display="flex" gap="40px" height="400px">
        <Box
          component="img"
          sx={{
            borderRadius: '20px',
            width: '400px',
            objectFit: 'cover'
          }}
          src="https://1000logos.net/wp-content/uploads/2023/01/Ethereum-logo.png"
        />
        <Box p="20px 0" width="100%">
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontSize="22px" fontWeight="bold" color="grey" mb="30px">
              {t(`${translationNamespace}.overview`)}
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

          <Box display="flex" gap="15%">
            <Box display="flex" gap="10px">
              <Box>
                {[
                  t(`${translationNamespace}.assetId`),
                  t(`${translationNamespace}.assetName`),
                  t(`${translationNamespace}.symbol`),
                  t(`${translationNamespace}.submissionDate`)
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
                {['345422', 'Dummy Asset', 'DA', 'Mar 32, 2023'].map((text) => (
                  <Typography key={text} mb="20px" height="38px" alignItems="center" display="flex">
                    {text}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box display="flex" gap="10px">
              <Box>
                {[
                  t(`${translationNamespace}.status`),
                  t(`${translationNamespace}.price`),
                  t(`${translationNamespace}.type`),
                  t(`${translationNamespace}.issuanceDate`)
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
        content={<Typography>{t(`${translationNamespace}.description`)}</Typography>}
      />

      <Box display="flex" gap="30px">
        <Accordian
          header="Token Information"
          content={
            <Box display="flex" gap="30px">
              <Box>
                {[
                  t(`${translationNamespace}.name`),
                  t(`${translationNamespace}.contactAdress`),
                  t(`${translationNamespace}.tokenStatus`),
                  t(`${translationNamespace}.lastUpdated`)
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
        <Accordian
          header="Token Stats"
          content={
            <Box display="flex" gap="30px">
              <Box>
                {[
                  t(`${translationNamespace}.totalSupply`),
                  t(`${translationNamespace}.mintedSupply`),
                  t(`${translationNamespace}.numberOfHolders`),
                  t(`${translationNamespace}.dailyPurchases`),
                  t(`${translationNamespace}.totalPurchases`)
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
                  <Typography key={text} mb="20px" height="38px" alignItems="center" display="flex">
                    {text}
                  </Typography>
                ))}
              </Box>
            </Box>
          }
        />
      </Box>
      <Accordian
        header="Token Functionalities"
        content={
          <Box display="flex" gap="30px" flexWrap="wrap">
            {[
              { title: t(`${translationNamespace}.mint`) },
              { title: t(`${translationNamespace}.transfer`) },
              { title: t(`${translationNamespace}.pause`) },
              { title: t(`${translationNamespace}.unpause`) },
              { title: t(`${translationNamespace}.burn`) },
              { title: t(`${translationNamespace}.block`) },
              { title: t(`${translationNamespace}.unblock`) }
            ].map(({ title }) => (
              <Button key={title} sx={{ width: '100px' }}>
                {title}
              </Button>
            ))}
          </Box>
        }
      />

      <Accordian
        header="Holders List"
        content={<InvestorHoldings holdings={dummyHoldings} columns={holdingColumns} />}
      />
      <Accordian header="Agent Listing" content={<AgentListing />} />
    </Box>
  );
};

export default AssetDetails;
