import type { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CountryDetailPage } from './pages/CountryDetailPage.tsx'
import { DashboardPage } from './pages/DashboardPage.tsx'

export const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/country/:id" element={<CountryDetailPage />} />
    </Routes>
  </BrowserRouter>
)
