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
        className="flex items-center justify-between px-6 py-2 mx-auto md:max-w-7xl md:px-8"
        aria-label="Global"
      >
        <div className="flex items-center gap-4">
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
