import type { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage.tsx'

export const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  </BrowserRouter>
)
