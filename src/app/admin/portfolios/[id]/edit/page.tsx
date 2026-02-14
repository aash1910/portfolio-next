import Link from 'next/link';
import { getProjectById } from '@/lib/portfolio';
import { notFound } from 'next/navigation';
import { updatePortfolio } from '../../actions';
import { DeletePortfolioButton } from '@/app/admin/portfolios/DeletePortfolioButton';
import { RepeaterField } from '@/app/admin/portfolios/RepeaterField';
import { ThumbnailField } from '@/app/admin/portfolios/ThumbnailField';

export default async function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();


  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/portfolios" className="text-gray-600 hover:text-gray-900 text-sm">
          ← Portfolios
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Edit: {project.title}</h1>
      </div>
      <form action={updatePortfolio} className="w-full space-y-4 bg-white p-6 rounded-lg border border-gray-200">
        <input type="hidden" name="id" value={project.id} />
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input id="title" name="title" type="text" defaultValue={project.title} required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">Short description</label>
          <input id="shortDescription" name="shortDescription" type="text" defaultValue={project.shortDescription} required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input id="category" name="category" type="text" defaultValue={project.category} required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter</label>
          <select id="filter" name="filter" defaultValue={project.filter} className="w-full border border-gray-300 rounded px-3 py-2 bg-white">
            <option value="filter-app">App</option>
            <option value="filter-product">Software</option>
            <option value="filter-website">Website</option>
          </select>
        </div>
        <ThumbnailField name="thumbnail" defaultValue={project.thumbnail} label="Thumbnail" folder={project.id} />
        <div>
          <label htmlFor="projectDate" className="block text-sm font-medium text-gray-700 mb-1">Project date</label>
          <input id="projectDate" name="projectDate" type="text" defaultValue={project.projectDate} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 mb-1">Tech stack</label>
          <input id="techStack" name="techStack" type="text" defaultValue={project.techStack} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="overview" className="block text-sm font-medium text-gray-700 mb-1">Overview</label>
          <textarea id="overview" name="overview" rows={4} defaultValue={project.overview} required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <RepeaterField name="images" label="Images" initialValues={project.images} placeholder="/assets/portfolio/x/1.png" />
        <RepeaterField name="keyFeatures" label="Key features (HTML allowed)" initialValues={project.keyFeatures} placeholder="e.g. <strong>Feature</strong>: Description" />
        <RepeaterField name="challenges" label="Challenges" initialValues={project.challenges} placeholder="Challenge description" />
        <RepeaterField name="achievements" label="Achievements" initialValues={project.achievements} placeholder="Achievement description" />
        <div>
          <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700 mb-1">Demo URL</label>
          <input id="demoUrl" name="demoUrl" type="url" defaultValue={project.demoUrl ?? ''} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="demoCredentials" className="block text-sm font-medium text-gray-700 mb-1">Demo credentials</label>
          <input id="demoCredentials" name="demoCredentials" type="text" defaultValue={project.demoCredentials ?? ''} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="androidAppUrl" className="block text-sm font-medium text-gray-700 mb-1">Android app URL</label>
          <input id="androidAppUrl" name="androidAppUrl" type="url" defaultValue={project.androidAppUrl ?? ''} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="iosAppUrl" className="block text-sm font-medium text-gray-700 mb-1">iOS app URL</label>
          <input id="iosAppUrl" name="iosAppUrl" type="url" defaultValue={project.iosAppUrl ?? ''} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">
            Save
          </button>
          <Link href="/admin/portfolios" className="px-4 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </Link>
        </div>
      </form>
      <DeletePortfolioButton id={project.id} />
    </div>
  );
}
