import { useEffect, useState } from 'react'
import AuthService from '@services/AuthService'
import { appUrls } from '@shared/appUrls'
import { useLocation, useNavigate } from 'react-router-dom'

type UseRefreshReturn = {
  isLoading: boolean
  isError: boolean
}

export const useRefresh = (): UseRefreshReturn => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    AuthService.refresh()
      .then(() => {
        if (location.pathname === appUrls.login) {
          navigate(appUrls.index, { replace: true })
        }
      })
      .catch((e) => {
        if (e?.response?.status === 403) {
          if (location.pathname !== appUrls.login && location.pathname !== appUrls.register) {
            navigate(appUrls.login, { replace: true })
          }
          return
        }
        setIsError(true)
      }).finally(() => {
        setIsLoading(false)
      })
  }, [location.pathname])

  return {
    isLoading,
    isError,
  }
}
