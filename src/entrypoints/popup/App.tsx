import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { SiGithub } from 'react-icons/si'

interface Resource {
  category?: string
  description?: string
  name: string
  url: string
}

const resources: Resource[] = [
  // Frontend Frameworks & Tools
  {
    category: 'Frontend',
    description: 'A utility-first CSS framework',
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com/docs',
  },
  {
    category: 'Frontend',
    description: 'React components library',
    name: 'shadcn/ui',
    url: 'https://ui.shadcn.com/docs/components/form',
  },
  {
    category: 'Frontend',
    description: 'Animation library for React',
    name: 'Framer Motion',
    url: 'https://motion.dev/docs/react-quick-start',
  },

  // Development Tools
  {
    category: 'Development',
    description: 'Next-gen browser extension framework',
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
    description: 'Electron build tool',
    name: 'Electron Vite',
    url: 'https://electron-vite.org/guide/',
  },
  {
    category: 'Development',
    description: 'Next Generation Frontend Tooling',
    name: 'Vite',
    url: 'https://vite.dev/guide/',
  },
  {
    category: 'Development',
    description: 'Testing Framework',
    name: 'Vitest',
    url: 'https://vitest.dev/guide/',
  },

  // Libraries & Utils
  {
    category: 'Libraries',
    description: 'TypeScript-first schema validation',
    name: 'Zod',
    url: 'https://zod.dev/?id=basic-usage',
  },
  {
    category: 'Libraries',
    description: 'React form validation library',
    name: 'React Hook Form',
    url: 'https://react-hook-form.com/get-started',
  },
  {
    category: 'Libraries',
    description: 'Universal Router for React',
    name: 'TanStack Router',
    url: 'https://tanstack.com/router/latest/docs/framework/react/quick-start',
  },
  {
    category: 'Libraries',
    description: 'Powerful async state management',
    name: 'TanStack Query',
    url: 'https://tanstack.com/query/latest/docs/framework/react/quick-start',
  },
  {
    category: 'Libraries',
    description: 'Fetch library for JavaScript',
    name: 'oFetch',
    url: 'https://github.com/unjs/ofetch/blob/main/README.md',
  },

  // Learning Resources
  {
    category: 'Learning',
    description: 'Data structures and algorithms',
    name: 'LabulaDong Algo',
    url: 'https://labuladong.online/algo/intro/data-structure-basic/',
  },
  {
    category: 'Learning',
    description: 'Deep dive into JavaScript',
    name: 'You Don\'t Know JS',
    url: 'https://github.com/getify/You-Dont-Know-JS#titles',
  },
  {
    category: 'Learning',
    description: 'Modern JavaScript Guide',
    name: 'Eloquent JavaScript',
    url: 'https://eloquentjavascript.net/',
  },

  // Best Practices
  {
    category: 'Best Practices',
    description: 'Project organization guidelines',
    name: 'Project Guidelines',
    url: 'https://github.com/elsewhencode/project-guidelines#project-guidelines--',
  },
  {
    category: 'Best Practices',
    description: 'Modern application development principles',
    name: '12 Factor App',
    url: 'https://12factor.net/',
  },
  {
    category: 'Best Practices',
    description: 'System design interview preparation',
    name: 'System Design Primer',
    url: 'https://github.com/donnemartin/system-design-primer#object-oriented-design-interview-questions-with-solutions',
  },
]

// Rename ToolItem to ResourceItem and update its props
function ResourceItem({ resource }: { resource: Resource }) {
  return (
    <div
      className="group relative cursor-pointer rounded-lg border p-4 transition-all hover:border-blue-500 hover:shadow-md"
      onClick={() => window.open(resource.url, '_blank')}
    >
      <div className="block text-lg font-medium text-blue-600 group-hover:text-blue-700">
        {resource.name}
      </div>
      {resource.description && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{resource.description}</p>
      )}
      {resource.category && (
        <div className="mt-2 flex flex-wrap gap-1">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
            {resource.category}
          </span>
        </div>
      )}
    </div>
  )
}

function Popup() {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase())
        || (resource.description && resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
        || (resource.category && resource.category.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesSearch
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

  // ...rest of the component remains similar, just update the rendering part:
  return (
    <Card className="flex h-[600px] w-[800px] flex-col overflow-hidden rounded-none">
      <CardHeader className="pb-3">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-8 transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search documentation..."
            type="text"
            value={searchTerm}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ScrollArea className="h-[400px]">
          <div className="space-y-6 p-4">
            {Object.entries(groupedResources).map(([category, items]) => (
              <div key={category}>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">{category}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {items.map(resource => (
                    <ResourceItem key={resource.name} resource={resource} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => window.open('https://github.com/mefengl/memcode/issues/new', '_blank')}
          variant="outline"
        >
          <SiGithub className="mr-2 size-4" />
          Suggest a Tool
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="text-gray-500"
              variant="link"
            >
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
                  <a className="underline" href="https://www.figma.com/community/file/968125295144990435" rel="noopener noreferrer" target="_blank">Fun Emoji Set</a>
                  {' '}
                  by
                  {' '}
                  <a className="underline" href="https://www.instagram.com/davedirect3/" rel="noopener noreferrer" target="_blank">Davis Uche</a>
                  , licensed under
                  {' '}
                  <a className="underline" href="https://creativecommons.org/licenses/by/4.0/" rel="noopener noreferrer" target="_blank">CC BY 4.0</a>
                  .
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

export default Popup
