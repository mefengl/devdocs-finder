import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { SiGithub } from 'react-icons/si'

interface Resource {
  category?: string
  name: string
  url: string
}

const resources: Resource[] = [
  // Frontend Frameworks & Tools
  {
    category: 'Frontend',
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com/docs',
  },
  {
    category: 'Frontend',
    name: 'shadcn/ui',
    url: 'https://ui.shadcn.com/docs/components/form',
  },
  {
    category: 'Frontend',
    name: 'Photonkit Components',
    url: 'http://photonkit.com/components/',
  },
  {
    category: 'Frontend',
    name: 'Photonkit Getting Started',
    url: 'http://photonkit.com/getting-started/',
  },
  {
    category: 'Frontend',
    name: 'Framer Motion',
    url: 'https://motion.dev/docs/react-quick-start',
  },

  // Development Tools
  {
    category: 'Development',
    name: 'WXT',
    url: 'https://wxt.dev/guide/essentials/entrypoints.html',
  },
  {
    category: 'Development',
    name: 'WXT Examples',
    url: 'https://wxt.dev/examples.html',
  },
  {
    category: 'Development',
    name: 'Electron Vite',
    url: 'https://electron-vite.org/guide/',
  },
  {
    category: 'Development',
    name: 'Vite',
    url: 'https://vite.dev/guide/',
  },
  {
    category: 'Development',
    name: 'Vitest',
    url: 'https://vitest.dev/guide/',
  },
  {
    category: 'Development',
    name: 'ElectronJS',
    url: 'https://www.electronjs.org/docs/latest',
  },

  // Libraries & Utils
  {
    category: 'Libraries',
    name: 'Zod',
    url: 'https://zod.dev/?id=basic-usage',
  },
  {
    category: 'Libraries',
    name: 'React Hook Form',
    url: 'https://react-hook-form.com/get-started',
  },
  {
    category: 'Libraries',
    name: 'TanStack Router',
    url: 'https://tanstack.com/router/latest/docs/framework/react/quick-start',
  },
  {
    category: 'Libraries',
    name: 'TanStack Query',
    url: 'https://tanstack.com/query/latest/docs/framework/react/quick-start',
  },
  {
    category: 'Libraries',
    name: 'oFetch',
    url: 'https://github.com/unjs/ofetch/blob/main/README.md',
  },

  // Learning Resources
  {
    category: 'Learning',
    name: 'LabulaDong Algo',
    url: 'https://labuladong.online/algo/intro/data-structure-basic/',
  },
  {
    category: 'Learning',
    name: 'You Don\'t Know JS',
    url: 'https://github.com/getify/You-Dont-Know-JS#titles',
  },
  {
    category: 'Learning',
    name: 'Eloquent JavaScript',
    url: 'https://eloquentjavascript.net/',
  },

  // Best Practices
  {
    category: 'Best Practices',
    name: 'Project Guidelines',
    url: 'https://github.com/elsewhencode/project-guidelines#project-guidelines--',
  },
  {
    category: 'Best Practices',
    name: '12 Factor App',
    url: 'https://12factor.net/',
  },
  {
    category: 'Best Practices',
    name: 'System Design Primer',
    url: 'https://github.com/donnemartin/system-design-primer#object-oriented-design-interview-questions-with-solutions',
  },
]

function ResourceItem({ resource }: { resource: Resource }) {
  return (
    <div
      className="flex cursor-pointer items-center justify-between border-b px-3 py-2 hover:bg-gray-50"
      onClick={() => window.open(resource.url, '_blank')}
    >
      <span className="text-sm text-gray-900">{resource.name}</span>
      <span className="text-xs text-gray-500">{extractDomain(resource.url)}</span>
    </div>
  )
}

function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname.replace('www.', '')
    return domain
  }
  catch {
    return url
  }
}

function Popup() {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredResources = useMemo(() => {
    if (!searchTerm)
      return resources

    const searchTermLower = searchTerm.toLowerCase()
    return resources.filter((resource) => {
      return (
        resource.name.toLowerCase().includes(searchTermLower)
        || resource.url.toLowerCase().includes(searchTermLower)
        || resource.category?.toLowerCase().includes(searchTermLower)
        || extractDomain(resource.url).toLowerCase().includes(searchTermLower)
      )
    })
  }, [searchTerm])

  const groupedResources = useMemo(() => {
    return filteredResources.reduce((acc, resource) => {
      const category = resource.category || 'Other'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(resource)
      return acc
    }, {} as Record<string, Resource[]>)
  }, [filteredResources])

  return (
    <div className="flex size-[600px] flex-col">
      <div className="border-b px-3 py-2">
        <div className="relative">
          <Search className="absolute left-2 top-1.5 size-4 text-gray-400" />
          <Input
            className="h-8 border-0 pl-8 ring-1 ring-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500"
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search..."
            type="text"
            value={searchTerm}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {Object.entries(groupedResources).map(([category, items]) => (
          <div key={category}>
            <div className="sticky top-0 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
              {category}
            </div>
            <div className="grid grid-cols-2 divide-x">
              {items.map(resource => (
                <ResourceItem key={resource.name} resource={resource} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-t px-3 py-2">
        <Button
          onClick={() => window.open('https://github.com/mefengl/devdocs-finder/issues/new', '_blank')}
          size="sm"
          variant="outline"
        >
          <SiGithub className="mr-1 size-3" />
          Suggest
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-xs text-gray-500" size="sm" variant="ghost">
              About
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>About</DialogTitle>
              <DialogDescription>
                <div className="mb-4 text-sm text-gray-700">
                  Made by
                  {' '}
                  <a className="underline" href="https://x.com/mefengl" rel="noopener noreferrer" target="_blank">Alan</a>
                  {' '}
                  😎
                </div>
                <div className="mb-4 text-xs text-gray-500">
                  Credits:
                  <br />
                  Logo from
                  {' '}
                  <a className="underline" href="https://heyzoish.gumroad.com/l/notionists" rel="noopener noreferrer" target="_blank">Notionists</a>
                  {' '}
                  by
                  {' '}
                  <a className="underline" href="https://bio.link/heyzoish" rel="noopener noreferrer" target="_blank">Zoish</a>
                  , licensed under
                  {' '}
                  <a className="underline" href="https://creativecommons.org/publicdomain/zero/1.0/" rel="noopener noreferrer" target="_blank">CC0 1.0</a>
                  . Remix of the original.
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Popup
