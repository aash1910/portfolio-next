import Link from 'next/link';
import { getSettings } from '@/lib/settings';
import { SettingsForm } from './SettingsForm';
import { ThumbnailField } from '../portfolios/ThumbnailField';
import { RepeaterField } from '../portfolios/RepeaterField';
import { SocialLinksRepeaterField } from './SocialLinksRepeaterField';
import { NavLinksRepeaterField } from './NavLinksRepeaterField';
import { InfoItemsRepeaterField } from './InfoItemsRepeaterField';
import { EducationRepeaterField } from './EducationRepeaterField';
import { ExperienceRepeaterField } from './ExperienceRepeaterField';

export default async function SettingsPage() {
  const settings = await getSettings();
  const { header, about, resume } = settings;

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">
          ← Dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Site Settings</h1>
      </div>

      <SettingsForm>
        {/* Header */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-medium text-gray-800">Header</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="siteName" className="mb-1 block text-sm font-medium text-gray-700">
                Site name
              </label>
              <input
                id="siteName"
                name="siteName"
                type="text"
                defaultValue={header.siteName}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <ThumbnailField
              name="headerProfileImage"
              defaultValue={header.profileImage}
              label="Profile image"
              assetsDir="img"
            />
            <SocialLinksRepeaterField name="socialLinks" label="Social links" initialValues={header.socialLinks} />
            <NavLinksRepeaterField name="navLinks" label="Navigation links" initialValues={header.navLinks} />
          </div>
        </section>

        {/* About */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-medium text-gray-800">About Section</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="aboutSectionTitle" className="mb-1 block text-sm font-medium text-gray-700">
                Section title
              </label>
              <input
                id="aboutSectionTitle"
                name="aboutSectionTitle"
                type="text"
                defaultValue={about.sectionTitle}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="introParagraph" className="mb-1 block text-sm font-medium text-gray-700">
                Intro paragraph
              </label>
              <textarea
                id="introParagraph"
                name="introParagraph"
                rows={3}
                defaultValue={about.introParagraph}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <ThumbnailField
              name="aboutProfileImage"
              defaultValue={about.profileImage}
              label="Profile image"
              assetsDir="img"
            />
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
                Full name / Title
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                defaultValue={about.fullName}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="bioParagraph" className="mb-1 block text-sm font-medium text-gray-700">
                Bio paragraph (italic)
              </label>
              <textarea
                id="bioParagraph"
                name="bioParagraph"
                rows={4}
                defaultValue={about.bioParagraph}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <InfoItemsRepeaterField name="infoItems" label="Info items (Birthday, Phone, etc.)" initialValues={about.infoItems} />
            <div>
              <label htmlFor="bottomParagraph" className="mb-1 block text-sm font-medium text-gray-700">
                Bottom paragraph
              </label>
              <textarea
                id="bottomParagraph"
                name="bottomParagraph"
                rows={3}
                defaultValue={about.bottomParagraph}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        </section>

        {/* Resume */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-medium text-gray-800">Resume Section</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="resumeSectionTitle" className="mb-1 block text-sm font-medium text-gray-700">
                Section title
              </label>
              <input
                id="resumeSectionTitle"
                name="resumeSectionTitle"
                type="text"
                defaultValue={resume.sectionTitle}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>
            <h3 className="text-sm font-medium text-gray-700">Summary</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="summaryName" className="mb-1 block text-sm text-gray-600">
                  Name
                </label>
                <input
                  id="summaryName"
                  name="summaryName"
                  type="text"
                  defaultValue={resume.summaryName}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="summaryDescription" className="mb-1 block text-sm text-gray-600">
                  Description
                </label>
                <textarea
                  id="summaryDescription"
                  name="summaryDescription"
                  rows={3}
                  defaultValue={resume.summaryDescription}
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>
              <RepeaterField
                name="summaryContactInfo"
                label="Contact info (address, phone, email)"
                initialValues={resume.summaryContactInfo}
                placeholder="e.g. +880171 250 1289"
              />
            </div>
            <EducationRepeaterField name="education" label="Education" initialValues={resume.education} />
            <ExperienceRepeaterField name="experience" label="Professional experience" initialValues={resume.experience} />
          </div>
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Save all settings
          </button>
          <Link
            href="/admin"
            className="rounded border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </SettingsForm>
    </div>
  );
}
