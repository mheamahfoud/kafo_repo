import React from 'react'
import { ChangeLanguage } from '../../api/account/account'
import {
    CAvatar,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import {
    cilLanguage,
    cifUs,
    cifSy

} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import en from './../../assets/images/avatars/en.jpg'
import sy from './../../assets/images/avatars/sy.png'
import { useTranslation } from 'react-i18next';
import { Avatar } from '@material-ui/core'
const AppHeaderLanguage = () => {
    const { t } = useTranslation()
    return (
        <CDropdown variant="nav-item"  >
            <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                <CIcon icon={cilLanguage} size="lg" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem href="#" style={{ display: 'flex' ,columnGap:'8px' }} onClick={() => {
                    ChangeLanguage('ar').then(() => {
                        localStorage.setItem('current_language', 'ar');
                        window.location.href = '/';
                    })

                    //window.location.href = '/Dashborad';
                    //  dispatch({ type: 'set', language: 'ar' })

                }}>

                    <CIcon icon={cifSy} size="lg" />

                    <span>{t('arabic')}</span>

                </CDropdownItem>
                <CDropdownItem href="#" style={{ display: 'flex' ,columnGap:'8px'}} onClick={() => {
                    ChangeLanguage('en').then(() => {
                        localStorage.setItem('current_language', 'en');
                        window.location.href = '/';
                    })
                    //   localStorage.setItem('current_language','en');


                }}>
                    <CIcon icon={cifUs} size="md" />

                    {t('english')}
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderLanguage
