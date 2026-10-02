import type { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CountryDetailPage } from './pages/CountryDetailPage.tsx'
import { DashboardPage } from './pages/DashboardPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'

export const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/country/:id" element={<CountryDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
)
