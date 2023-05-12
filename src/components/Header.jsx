import { Link } from 'react-router-dom'
import { MonkLogo } from './Logos'

const navigation = [
  {
    name: 'Monk Logo',
    href: '/',
    logo: MonkLogo,
  },
  { name: 'Monk Upsell & Cross-sell', href: '/' },
]

const Header = () => {
  return (
    <header className="border-b shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between py-2 px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex gap-4 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-500"
            >
              {item?.logo ? <item.logo /> : item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Header
