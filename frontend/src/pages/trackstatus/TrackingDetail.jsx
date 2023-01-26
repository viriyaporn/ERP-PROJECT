import React from 'react'
import Layout from '../../layouts/Layout'
import { PhotoMokup } from '../../mockup/PhotoMockup'
import { TrackDevide } from '../../mockup/TrackDevide'
import { GrNext } from 'react-icons/gr';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { dateTimeToThaiString } from '../../utils/Utils';
import ReportDetail from '../../components/layout/ReportDetail';

export default function TrackingDetail() {
  const navigate = useNavigate();

  return (
    <div>
      <Layout>
        <ReportDetail/>
      </Layout>
    </div>
  )
}
