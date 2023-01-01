import React, { FC } from 'react'

import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { useFormik } from 'formik'

import { createPackTC, updatePackTC } from '../../packs/packs-reducer'
import { BaseModal } from '../BaseModal'
import { ButtonModalGroup } from '../ButtonModalGroup'
import s from '../Modal.module.css'

import { useAppDispatch } from 'app/store'
import { CustomInput } from 'common/components/CustomInput/CustomInput'

export const PacksModal: FC<PacksModalType> = ({ titleName, open, hide, id_pack, packName }) => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      packName: packName ? packName : '',
      private: false,
    },
    validate: (values: { packName: string; private: boolean }) => {
      const errors: FormikErrorType = {}

      if (!values.packName) {
        errors.packName = 'Required field'
      } else if (values.packName.length > 30) {
        errors.packName = 'Pack name length must be lower than 30 symbols ⚠'
      }

      return errors
    },
    onSubmit: (values: { packName: string; private: boolean }) => {
      if (titleName === 'Add new pack') {
        formik.resetForm()
        dispatch(createPackTC(values.packName, values.private))
        hide()
      } else if (titleName === 'Edit pack') {
        dispatch(updatePackTC(values.packName, id_pack ? id_pack : ''))
        hide()
      }
    },
  })

  return (
    <>
      <BaseModal open={open} titleName={titleName} hide={hide}>
        <div className={s.body}>
          <FormGroup>
            <CustomInput
              label={'Name pack'}
              error={!!formik.errors.packName && formik.touched.packName}
              helperText={formik.touched.packName && formik.errors.packName}
              {...formik.getFieldProps('packName')}
            />
            <div className={s.checkboxPrivate}>
              <FormControlLabel
                label={<Typography className={s.checkbox}>Private pack</Typography>}
                control={<Checkbox checked={formik.values.private} {...formik.getFieldProps('private')} />}
              />
            </div>
            <ButtonModalGroup
              hide={hide}
              onClickHandler={() => {
                formik.handleSubmit()
              }}
            />
          </FormGroup>
        </div>
      </BaseModal>
    </>
  )
}

type PacksModalType = {
  titleName: string
  open: boolean
  hide: () => void
  id_pack?: string
  packName?: string
}
type FormikErrorType = {
  packName?: string
  private?: boolean
}
